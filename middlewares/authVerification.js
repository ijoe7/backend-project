import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let router = express.Router();

export const validateToken = async (req, res, next) => {
    
	try {
		const authorizationHeader = req.headers.authorization;
		let result;
		if (authorizationHeader) {
			const token = authorizationHeader.split(" ")[1];
			result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
			req.user = result;
			next();
		} else {
			result = {
				error: "Authentication error. Token missing", status: 401
			};
			res.status(401).json({ result });
		}
	} catch (error) {
		res.status(401).json({message: "Token expired"});
	}
};

export default router;