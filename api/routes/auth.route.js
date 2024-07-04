import express from "express";
import {
  signin,
  signup,
  google,
  signout,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Now create a route for signup
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);
export default router;
