import slowDown from "express-slow-down";

export const chatSlowDown = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 5,
  delayMs: (used, req) => {
    const delayAfter = req.slowDown.limit;
    return (used - delayAfter) * 500;
  },
});
