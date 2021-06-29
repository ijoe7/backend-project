import express from "express";
import jwt from "jsonwebtoken";
import { validateUser } from "../utils/userValidator.js";
import dotenv from "dotenv";
let router = express.Router();
dotenv.config();

let data = [];

/**
 * A simple stateless microservice in Node.js.
 * Sign up with a username and password.
 * @async
 * @param {object} req 
 * @param {object} res 
 * @returns {message} successfully signed up message
 * @throws {message} User already signed up
 */
export const signUp = async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	try {
		let newUser = {
			username: req.body.username,
			password: req.body.password
		};
		const loggedUser = data.find((item) => item.username === newUser.username && item.password === newUser.password);
		if (!loggedUser) {
			data.push(newUser);
			return res.status(201).json({ message: "Successfully signed up" });
		}
	} catch (error) {
		return res.status(400).json({ message: "User already registered" });
	}
};



/**
 * A login request body that contains an arbituary username/password pair.
 * It returns a signed Json Web Token to access specific end points.
 * @async
 * @param {object} req 
 * @param {object} res 
 * @returns {message, token} User signed in successfully and the Json Web Token
 * @throws {message} Error signing in message
 */
export const loginUser = async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	try {
		const { username, password } = req.body;
		const user = {
			username: username,
			password: password
		};

		const loggedUser = data.find((item) => item.username === user.username && item.password === user.password);
		if (!loggedUser) return res.status(400).json({message: "User not registered"});
	
		const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
			expiresIn: "1h",
		});
		res.status(201).json({ message: "User signed in successfully", token });
	}
	catch (error) {
		res.status(400).json({ message: "Error signing in" });
	}
};

export default router;