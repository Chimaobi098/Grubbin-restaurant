import "dotenv/config";
import * as db from "../db/queries.js";
import { vectorStore, llmChain } from "../langchain/chatbot.js";
// import { chain } from "../langchain/chatbot.js";

import { cachedResponses } from "../langchain/cachedResponses.js";
import { cachedResponseStore } from "../langchain/chatbot.js";

export const specificItem = async (req, res) => {
  const item = await db.findItem(req.params.menuid);
  res.json(item);
};

export const getAllItems = async (req, res) => {
  const items = await db.allItems();
  res.json(items);
};

export const findOrders = async (req, res) => {
  try {
    const orders = await db.findOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { totalAmount, status, items } = req.body;
    const order = await db.createOrder(req.user.id, totalAmount, status, items);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const populateProfile = async (req, res) => {
  try {
    const user = await db.findUserById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

function parseMenuItems(text) {
  const regex = /\d+\.\s(.+?):\s(.+?)\s+\(\$(\d+\.\d{2})\)/g;
  const items = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const [, name, description, price] = match;
    items.push({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
    });
  }
  return items;
}

export const chat = async (req, res) => {
  const { question } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  // ── 1) EXACT‐MATCH CHECK
  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();

  const exact = cachedResponses.find(
    ({ q }) => normalize(q) === normalize(question)
  );
  if (exact) {
    return res.json({ answer: exact.a });
  }

  // ── 2) SEMANTIC‐SEARCH WITH SCORE
  const hitsWithScores = await cachedResponseStore.similaritySearchWithScore(
    question,
    1
  );

  if (hitsWithScores.length > 0) {
    const [{ pageContent }, similarity] = hitsWithScores[0];
    const [, answer] = pageContent.split("\nA: ");

    console.log({ question, matchedQuery: pageContent, similarity });

    if (similarity > 0.7) {
      return res.json({ answer: answer.trim() });
    }
  }

  // ── 3) FALLBACK KEYWORD SHORT‐CIRCUITS
  if (/^(hi|hello|hey|hey there)$/i.test(question)) {
    return res.json({
      answer: "Hey! I’m Grubbin Bot 🍔❤️ What can I get cooking for you today?",
    });
  }

  const THANKS = /^(thanks|thank you|thx)$/i;
  if (THANKS.test(question)) {
    return res.json({
      answer: "You’re welcome! Enjoy your meal 😋",
    });
  }

  const JOKE = /joke/i;
  if (JOKE.test(question)) {
    return res.json({
      answer:
        "Why did the tomato turn red? 🍅 Because it saw the salad dressing! 😜",
    });
  }

  const HUNGRY = /hungry/i;
  if (HUNGRY.test(question)) {
    return res.json({
      answer: "Feeling hungry? Our Margherita Pizza never lets you down! 🍕",
    });
  }

  // Top-N detection
  const topMatch = question.match(/(?:top|give me)\s+(\d+)/i);
  if (topMatch) {
    const N = Math.min(parseInt(topMatch[1], 10), 8);
    const docs = await vectorStore.similaritySearch(question, N);

    // format exactly N items from docs
    const answerText = docs
      .slice(0, N)
      .map((doc, i) => {
        const lines = doc.pageContent.split("\n");
        const name = (lines.find((l) => l.startsWith("Name: ")) || "").replace(
          "Name: ",
          ""
        );
        const desc = (
          lines.find((l) => l.startsWith("Description: ")) || ""
        ).replace("Description: ", "");
        const price = (
          lines.find((l) => l.startsWith("Price: ")) || ""
        ).replace("Price: ", "");
        return `${i + 1}. ${name}: ${desc} (${price})`;
      })
      .join("\n");

    const dishes = parseMenuItems(answerText);
    return res.json({ answer: dishes });
  }

  try {
    const raw = await llmChain.invoke({ question });
    const dishes = parseMenuItems(raw);

    if (dishes.length > 0) {
      // model returns a numbered list we could parse
      return res.json({ answer: dishes });
    } else {
      // otherwise it's a plain-text FAQ or recommendation
      return res.json({ answer: raw });
    }
  } catch (err) {
    console.error("LLM error:", err);
    return res.status(500).json({ error: "LLM failed" });
  }
};
