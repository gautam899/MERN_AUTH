import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
// Now we will create a route to update the form data.
// In order to be able to update the form data we will first verify the token
// Since we do not want any other user to update someone else's we need to verify the token.
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
