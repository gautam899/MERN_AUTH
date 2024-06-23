import mongoose from "mongoose";
import { type } from "os";
// Create a new schema for one particular user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

// Now create a model corresponding to a user in the db
const User = mongoose.model("User",userSchema);
export default User;


 