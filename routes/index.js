import express from "express";
import { validateToken } from "../middlewares/authVerification.js";
import {jsonPatchData} from "../controllers/indexController.js"

let router = express.Router();

router.post("/patch", validateToken, jsonPatchData);

export default router;
