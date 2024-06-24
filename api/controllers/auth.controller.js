import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  // 10 here is the number of salts for hashing.

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next.error();
    // This way we are signalling the global error middleware that an error has occurred.
  }
};
