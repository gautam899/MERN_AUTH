import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.route.js";//In backend we always add .js
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
// Now we will create listner on port 3000 which will listen for any connection
//on that port and if a connection is detected a callback function will be invoked
//which will console log that server is running on port 3000.
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Send a get request on the home page.
//If a req is detected on the home page in reponse there will be a message.
app.use("/api/user",userRoutes);
