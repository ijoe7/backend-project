import express from "express";
import { validateToken } from "../middlewares/authVerification.js";
import { jsonPatchData } from "../controllers/indexController.js";
import { thumbnailReq } from "../controllers/thumbnailreq.js";

let router = express.Router();

router.post("/patch", validateToken, jsonPatchData);
router.post("/thumbs", thumbnailReq);

export default router;
