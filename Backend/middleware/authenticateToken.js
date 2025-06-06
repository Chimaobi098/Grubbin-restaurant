import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(400).send("ACCESS DENIED");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(400).send("INVALID TOKEN");
    req.user = payload;
    next();
  });
};
