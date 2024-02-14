import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { addStorageTypeByUserId, deleteStorageTypeByUserId, getStorageTypeByUserId } from "../services/storagetype.service.js";

export const addStorageType = async (req,res)=>{
    console.log('req.body.type:', req.body)
    if(!req.body?.type) {
        return res.status(status.BAD_REQUEST).send(status.BAD_REQUEST);
    }

    res.send(response(status.SUCCESS, await addStorageTypeByUserId(req.body.type, req.userID)));
}

export const deleteStorageType = async (req,res)=>{
    const { storageTypeId } = req.params;
    if(!storageTypeId) {
        return res.status(status.BAD_REQUEST).send(status.BAD_REQUEST);
    }

    res.send(response(status.SUCCESS, await deleteStorageTypeByUserId(Number(storageTypeId), req.userID)));
}

export const getStorageType = async(req, res) => {
    const {userID} = req;
    res.send(response(status.SUCCESS, await getStorageTypeByUserId(userID)));}