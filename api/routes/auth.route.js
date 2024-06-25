import express from "express"
import { signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();


// Now create a route for signup
router.post("/signup",signup);
router.post("/signin",signin);

export default router;