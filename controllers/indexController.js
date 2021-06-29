import express from "express";
import jsonpatch from "jsonpatch";
import {validateJsonPatch} from "../utils/indexValidator.js";

let router = express.Router();



/**
 * Request body contains a JSON object and a JSON patch object.
 * It returns a formatted or patched JSON object.
 * @param {object} req 
 * @param {object} res 
 * @returns {message, patchedDoc} message and resulting JSON object
 * @throws {message} Error patching message
 */
export const jsonPatchData = (req, res) => {
	const { error } = validateJsonPatch(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	try {
		const { jsonObj, jsonPatchObj} = req.body;
		const patchedDoc = jsonpatch.apply_patch(jsonObj, jsonPatchObj);
		res.status(201).json({message: "Data Edited", patchedDoc});
	} catch (error) {
		res.status(400).json({ message: "Error patching data"});
	}
};


export default router;