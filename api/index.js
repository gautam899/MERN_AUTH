import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.route.js"; //In backend we always add .js
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";//To parse the cookie anywhere in the application. 
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
app.use(express.json()); //This will make the json as input of our backend
// Now we will create listner on port 3000 which will listen for any connection
//on that port and if a connection is detected a callback function will be invoked
//which will console log that server is running on port 3000.
app.use(cookieParser());//we can use the cookie parser to get the cookie
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Send a get request on the home page.
//If a req is detected on the home page in reponse there will be a message.
app.use("/api/user", userRoutes);

// Now we need to mount the routes under /api/auth using the below expression.
// When a user makes a POST request to /api/auth/signup, our server will handle the signup logic defined in our auth.route.js file.
app.use("/api/auth", authRoute);

// Now lets create a global middleware for handeling errors in the backend
// next function is used to call the next middleware in the chain.

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode, 
  });
});
