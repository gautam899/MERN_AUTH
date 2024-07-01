import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "The api is working",
  });
};

// Update user
export const updateUser = async (req, res, next) => {
  // Check if the user that is trying to update the profile is actually the owner of the account.
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You are not authorized!!!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          // We do not want to send all the information as it is not safe since a person can use the information to change the admin.
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    // send the user to client side but only after seperating the password form the information
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);  
  } catch (error) {

  }
};
