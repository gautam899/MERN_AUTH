import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  // 10 here is the number of salts for hashing.

  const newUser = new User({ username, email, password:hashPassword });
  
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
