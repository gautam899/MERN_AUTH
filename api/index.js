import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //initialize dotenv

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Y8qdspPe4DJviegN
// mongodb+srv://gautambhavya899:Y8qdspPe4DJviegN@mernauthentication.4xlrnsv.mongodb.net/?retryWrites=true&w=majority&appName=MernAuthentication
