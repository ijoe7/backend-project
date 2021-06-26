import express from "express";
import { signUp, loginUser } from "../controllers/userController.js";
var router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

export default router;
