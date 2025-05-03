// const express = require("express");
// const app = express();

// require("dotenv").config();

// const cors = require("cors");
// const cookieParser = require("cookie-parser");

//imported routes
// const apiRoute = require("./routes/api");
// const authRoute = require("./routes/auth");

import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables

const app = express();

import apiRoute from "./routes/api.js";
import authRoute from "./routes/auth.js";

const origin =
  process.env.NODE_ENV == "production"
    ? process.env.FRONTEND_PROD_URL
    : process.env.FRONTEND_DEV_URL;

//middleware
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api", apiRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`SERVER LISTENING ON ${PORT}`));
