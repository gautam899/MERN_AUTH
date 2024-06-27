import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // 10 here is the number of salts for hashing.

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);
    // This way we are signalling the global error middleware that an error has occurred.
  }
};

export const signin = async (req, res, next) => {
  // first we need the email and password to verify that input to verify the person
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(401, "User Not found!!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    // Now if we are completely sure that the users email and password are correct we will
    // add a token to the cookie of the browser. A token is a hash value
    // made out of the unique information from the user and that information can be used later to verify the user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // We do not want to send the password to the client
    const { password: hashedPassword, ...rest } = validUser._doc; //Make sure to add the underline doc
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
    // The reason why we are sending the validUser data is because we will need that data
    // to present the user avataar at some places.
  } catch (error) {
    next(error);
  }
};
