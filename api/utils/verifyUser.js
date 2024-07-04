import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Here we will write a function in which we can use to verify
// if the user is verified
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Access Denied!!!"));
  }
  // If there is a token we check if there occurs a error.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"));

    req.user = user;
    // If everything goes fine we will go to the next middleware or the function which is updateUser
    next();
  });
};
