import express from 'express';

let router = express.Router();


let dataInfo = [];


export const jsonPatchData = async (req, res) => {
    try {
        const { jsonObj: { firstName, lastName, gender, age, status }, jsonPatchObj: { op, path, value } } = req.body;
        const patchData = {
            jsonObj: {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                age: age,
                status: status
            }
        }
    } catch (error) {
        
    }
}


export default router;