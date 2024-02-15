import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStorageType, deleteStorageType, getStorageType } from "../models/storagetype.dao.js";

export const addStorageTypeByUserId = async (type, userId) => {
    const createData = await addStorageType({
        'storageType': type,
        'userId': userId
    });
    console.log("createStoragePost StoragePostId : " + createData.storagePostId);

    if(createData.storagePostId == -1){
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }else{
        return { "storage": true };
    }
}

export const deleteStorageTypeByUserId = async (storageTypeId, userId) =>{
    const deleteData = await deleteStorageType({
        userId,
        storageTypeId
    })

    if(deleteData.storagePostId == -1){
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }else{
        return { "storage delete": true };
    }
}


export const StorageTypeByUserId = async (userId) => {

    try {
        const result = await getStorageType(userId);
        return result;
        } catch (error) {
            console.error(error);
            throw error;
        }

    
}