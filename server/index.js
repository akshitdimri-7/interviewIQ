import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDb from "./config/connectDb.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Server is RUNNING.");
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
  connectDb();
});
