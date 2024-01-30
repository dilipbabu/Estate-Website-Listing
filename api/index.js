import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connection Successful, Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Connection Error, Cannot Connect to DB!");
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is Listening on port 3000");
});
