import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { getStorageTypeByUserId, addStorageTypeSql, deleteStorageTypeSql, getStorageTypeSql } from "./storagetype.sql.js";

export const addStorageType = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(getStorageTypeByUserId, [data.userId, data.storageType]);
        console.log('resultSearch:', resultSearch)
        if (resultSearch[0][0] != null) {
            conn.release();
            return { "storagePostId": resultSearch[0][0].storage_type_id }; 
        }
        const resultStorageType = await pool.query(addStorageTypeSql, [data.storageType, data.userId]);
        
        conn.release();

        return { "storagePostId": resultStorageType[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const deleteStorageType = async ({storageTypeId, userId}) => {
    try{
        const conn = await pool.getConnection();
        const resultStorageType = await pool.query(deleteStorageTypeSql, [storageTypeId, userId]);
        
        conn.release();

        return { "storagePostId": resultStorageType[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const getStorageType = async (user_id) => {
    try {
        const conn = await pool.getConnection();
        const myStorageTypes = await pool.query(getStorageTypeSql, [user_id]);
        if(myStorageTypes.length == 0){
            return -1;
        }
        conn.release();
        return myStorageTypes[0];
        
    } catch (err) {
        throw err;
    }

}