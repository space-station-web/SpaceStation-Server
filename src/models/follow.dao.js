import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { getFollowByUserId, createFollowSql, deleteFollowSqlById, deleteFollowSqlByFollowIdAndUserId } from "./follow.sql.js";

export const getFollowListByUserId = async ({userId, limit, offset}) => {
    try {
        const conn = await pool.getConnection();
        const refinedLimit = limit || 8;
        const followList = await pool.query(getFollowByUserId(refinedLimit), [userId, refinedLimit, offset || 0]);

        //console.log('followList', followList)
        if(followList.length == 0){
            return -1;
        }
        
        conn.release();
        return followList[0];
        
    } catch (err) {
        throw new BaseError(err);
    }
};

export const addFollow = async ({userId, followId}) => {
    try{
        const conn = await pool.getConnection();
        const followList = await getFollowListByUserId({userId})
        const isAlreadyHas = followList.some((follow) => follow.follow_id === followId)

        if(isAlreadyHas) return;
        
        const resultFollow = await pool.query(createFollowSql, 
            [userId, followId] );

        conn.release();

        return { "followId": resultFollow[0].insertId, "resultContents": resultFollow };
        
    }catch (err) {
        throw new BaseError(err);
    }
};

export const removeFollow = async ({id, userId, followId}) => {
    try{
        const conn = await pool.getConnection();
        const sql = (id === 0 || id) ? deleteFollowSqlById : deleteFollowSqlByFollowIdAndUserId
        const params = (id === 0 || id) ? [id] : [userId, followId]
        const resultFollow = await pool.query(sql, params);

        conn.release();

        return {"deletedFollow": resultFollow[0].affectedRows, "deletedFollowContent": resultFollow};
        
    }catch (err) {
        throw new BaseError(err);
    }
};