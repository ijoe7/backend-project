import express from 'express';
import jsonpatch from 'jsonpatch';
import {validateJsonPatch} from '../utils/indexValidator.js'

let router = express.Router();




export const jsonPatchData = (req, res) => {
    const { error } = validateJsonPatch(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    try {
        const { jsonObj, jsonPatchObj} = req.body;
        // const patchData = {
        //     jsonObj: {
        //         firstName: firstName,
        //         lastName: lastName,
        //         gender: gender,
        //         age: age,
        //         status: status
        //     },
        //     jsonPatchObj: [{
        //         op: op,
        //         from: from,
        //         path: path,
        //         value: value
        //     }]
        // }
        const patchedDoc = jsonpatch.apply_patch(jsonObj, jsonPatchObj);
        res.status(201).json({message: "Data Edited", patchedDoc})
    } catch (error) {
        res.status(400).json({ message: "Error patching data" });
    }
}


export default router;