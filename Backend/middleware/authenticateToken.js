const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(400).send("ACCESS DENIED");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(400).send("INVALID TOKEN");
    req.user = payload;
    next();
  });
};
