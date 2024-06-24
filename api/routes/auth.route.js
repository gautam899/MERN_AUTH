import express from "express"
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();


// Now create a route for signup
router.post("/signup",signup);

export default router;