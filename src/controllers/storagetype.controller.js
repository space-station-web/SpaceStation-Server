import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { addStorageTypeByUserId, deleteStorageTypeByUserId, StorageTypeByUserId } from "../services/storagetype.service.js";

export const addStorageType = async (req,res)=>{
    // console.log('req.body.type:', req.body)
    if(!req.body?.type) {
        return res.status(status.BAD_REQUEST).send(status.BAD_REQUEST);
    }
    // 미들웨어 사용시 const userID = 20; 지우고 아래줄 userID를 req.userID로 변경

    res.send(response(status.SUCCESS, await addStorageTypeByUserId(req.body.type, req.userID)));
}

export const deleteStorageType = async (req,res)=>{
    const { storageTypeId } = req.params;
    if(!storageTypeId) {
        return res.status(status.BAD_REQUEST).send(status.BAD_REQUEST);
    }
    

    // 미들웨어 사용시 const userID = 20; 지우고 아래줄 userID를 req.userID로 변경
    res.send(response(status.SUCCESS, await deleteStorageTypeByUserId(Number(storageTypeId), req.userID)));
}

export const getStorageType = async(req, res) => {
    const { userId } = req.params;
    return res.send(response(status.SUCCESS, await StorageTypeByUserId(userId)));


}


