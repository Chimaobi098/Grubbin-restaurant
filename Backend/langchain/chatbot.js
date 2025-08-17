import "dotenv/config";
//mew
import { OpenAI } from "openai/client.js";
//
import { HfInference } from "@huggingface/inference";
import { Document } from "langchain/document";
import { Embeddings } from "@langchain/core/embeddings";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { cachedResponses } from "./cachedResponses.js";

const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

//new
// use Hugging Face router in OpenAI-compatible mode
const client = new OpenAI({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  baseURL: "https://router.huggingface.co/v1",
});

// //

class HuggingFaceEmbeddings extends Embeddings {
  async embedDocuments(texts) {
    return Promise.all(
      texts.map((t) =>
        inference.featureExtraction({
          model: "BAAI/bge-small-en-v1.5",
          inputs: t,
          wait_for_model: true,
        })
      )
    );
  }
  async embedQuery(text) {
    return inference.featureExtraction({
      model: "BAAI/bge-small-en-v1.5",
      inputs: text,
      wait_for_model: true,
    });
  }
}

const faq = [
  { q: "Do you deliver on Sundays?", a: "Yes, from 9am–9pm." },
  { q: "What is the delivery fee?", a: "Delivery fee is $5 flat rate." },
  {
    q: "Do you offer vegetarian options?",
    a: "Yes, we offer a wide range of vegetarian meals.",
  },
];

const menuItems = [
  {
    name: "BBQ Beef Burger",
    description:
      "Juicy beef patty with BBQ sauce, lettuce, and cheese in a toasted bun.",
    price: 19.99,
  },
  {
    name: "Spaghetti Bolognese",
    description:
      "Rich tomato sauce with minced beef over perfectly cooked spaghetti.",
    price: 41.79,
  },
  {
    name: "Garden Fresh Salad",
    description:
      "Mixed greens, cherry tomatoes, cucumbers, and a light vinaigrette.",
    price: 9.99,
  },
  {
    name: "Grubbin Waffles",
    description:
      "Crispy waffles with strawberry and vanilla ice cream delight.",
    price: 34.99,
  },
  {
    name: "Vegan Farfalle",
    description: "Vegan Farfalle pasta with spinach sauce and fried chickpea.",
    price: 32.99,
  },
  {
    name: "Roasted Chicken Platter",
    description: "Juicy roasted chicken served with flavorful sides.",
    price: 24.99,
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
    price: 12.99,
  },
  {
    name: "Ice Cream Cake",
    description: "Creamy ice cream cake topped with assorted sweets.",
    price: 14.99,
  },
];

const faqDocs = faq.map(
  ({ q, a }) => new Document({ pageContent: `FAQ\nQ: ${q}\nA: ${a}` })
);
const menuDocs = menuItems.map(
  ({ name, description, price }) =>
    new Document({
      pageContent: `Menu Item\nName: ${name}\nDescription: ${description}\nPrice: $${price.toFixed(
        2
      )}`,
    })
);

export const vectorStore = await MemoryVectorStore.fromDocuments(
  [...faqDocs, ...menuDocs],
  new HuggingFaceEmbeddings()
);

//cached responses

export const cachedDocs = cachedResponses.map(
  ({ q, a }) => new Document({ pageContent: `Q: ${q}\nA: ${a}` })
);

export const cachedResponseStore = await MemoryVectorStore.fromDocuments(
  cachedDocs,
  new HuggingFaceEmbeddings()
);

//end

const SEED = `
User: Hi there!
Bot: Hey there! I’m Grubbin Bot 🍔❤️ What can I get cooking for you today?

User: What’s good?
Bot: Our BBQ Beef Burger is a fan-fave, and the Vegan Farfalle is a hit with plant-lovers! 😊

User: Do you have vegan options?
Bot: Absolutely! Our Vegan Farfalle and Garden Fresh Salad are perfect for you. 🥗

User: Thanks!
Bot: You’re welcome! Have a tasty day! 👋

User: who made you
Bot: I was created by Chimaobi in a lab, crafted with the finest code and a dash of digital magic to serve you the best food info in town! ⚡💻🍔

User: I’d like something spicy.
Bot: I’m sorry, we don’t have any spicy specials right now. Here are the spiciest items from our actual menu:  
1. Roasted Chicken Platter: Juicy roasted chicken served with flavorful sides. ($24.99)  
(If you’d like a kick, you can always add hot sauce on the side!)

`;
const prompt = PromptTemplate.fromTemplate(`
${SEED}
Now, using only the CONTEXT below, answer the next question in the same friendly style.

CONTEXT:
{context}

User: {question}
Bot:
`);

// export const llmChain = RunnableSequence.from([
//   {
//     context: async (input) => {
//       const hits = await vectorStore.similaritySearch(input.question, 8);
//       return hits.map((d) => d.pageContent).join("\n\n");
//     },
//     question: (input) => input.question,
//   },
//   prompt,
//   async (pv) => {
//     const out = await inference.textGeneration({
//       model: "google/flan-t5-large",
//       inputs: pv.toString(),
//       parameters: { max_new_tokens: 250, temperature: 0.7 },
//     });
//     return out.generated_text;
//   },
// ]);

export const llmChain = RunnableSequence.from([
  {
    context: async (input) => {
      const hits = await vectorStore.similaritySearch(input.question, 8);
      return hits.map((d) => d.pageContent).join("\n\n");
    },
    question: (input) => input.question,
  },
  prompt,
  async (pv) => {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:cerebras",
      messages: [
        {
          role: "system",
          content: "You are Grubbin Bot, a friendly food assistant.",
        },
        { role: "user", content: pv.toString() },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  },
]);
