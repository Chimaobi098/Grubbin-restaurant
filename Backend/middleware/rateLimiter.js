import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,

  message: {
    error: "Too many requests. Please wait a moment and try again.",
  },
});
