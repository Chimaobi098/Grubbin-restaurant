// test-fetch.js
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

async function test() {
  const token = process.env.HUGGINGFACEHUB_API_KEY;
  if (!token) {
    console.error("⚠️ No token in HUGGINGFACEHUB_API_KEY");
    process.exit(1);
  }
  console.log("Using token prefix:", token.slice(0, 5) + "…");

  const res = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-large",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: "Hello, world!" }),
    }
  );

  console.log("Status:", res.status, res.statusText);
  const body = await res.text();
  console.log("Body:", body);
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
