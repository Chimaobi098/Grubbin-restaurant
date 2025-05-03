import "dotenv/config";
import { HfInference } from "@huggingface/inference";
const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

const generateEmbedding = async () => {
  const result = await inference.featureExtraction({
    model: "BAAI/bge-small-en-v1.5",
    // model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "Hello world",
  });
  console.log(result);
};

const translate = async () => {
  const result = await inference.translation({
    model: "google-t5/t5-small",
    inputs: "Hello world",
  });

  console.log(result);
};

const questionAnswering = async () => {
  const result = await inference.questionAnswering({
    inputs: {
      context: "2 primary colors can be added to get a secondary color",
      question: "what colors can i add to get orange?",
    },
  });
  console.log(result);
};

// questionAnswering();
// translate();
// generateEmbedding();
