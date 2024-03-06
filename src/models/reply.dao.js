import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addBookReplySql, searchBookReplyByBookIdSql, 
         delBookReplySql, searchBookReplySql,
         addPostReplySql, searchPostReplyByPostIdSql, 
         delPostReplySql, searchPostReplySql, searchNicknameSql, addnicknameSql, nicknameSql } from "./reply.sql.js";

export const addBookReply = async (data) => {
    try{
        const conn = await pool.getConnection();
        const nickdata = await pool.query(nicknameSql, [data.user_id])
        console.log("nickdata: ", nickdata[0][0]);
        const resultPost = await pool.query(addBookReplySql, [data.content, new Date(), data.user_id, data.book_id, data.front_reply_id, nickdata[0][0].nickname]);
        conn.release();

        return resultPost[0].insertId;  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const searchBookReply = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchBookReplyByBookIdSql, [data.book_id]);
        conn.release();

        return resultSearch;
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delBookReply = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultReply = await pool.query(searchBookReplySql, [data.book_reply_id]);
        if (resultReply[0][0].user_id != data.user_id) {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
        const result = await pool.query(delBookReplySql, [data.book_reply_id]);
        conn.release();

        return result[0].affectedRows; 
    } catch (err) {
        throw new BaseError(err);
    }
}

export const addPostReply = async (data) => {
    try{
        const conn = await pool.getConnection();
        const nickdata = await pool.query(nicknameSql, [data.user_id])
        console.log("nickdata: ", nickdata[0][0]);
        // const nickname = await pool.query(addnicknameSql, [nickdata])
        const resultPost = await pool.query(addPostReplySql, [data.content, new Date(), data.user_id, data.post_id, data.front_reply_id, nickdata[0][0].nickname]);
        conn.release();

        return resultPost[0].insertId;  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const searchPostReply = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchPostReplyByPostIdSql, [data.post_id]);
        conn.release();
        console.log("resultSearch: ", resultSearch[0][0]);


        return resultSearch
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delPostReply = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultReply = await pool.query(searchPostReplySql, [data.post_reply_id]);
        if (resultReply[0][0].user_id != data.user_id) {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
        const result = await pool.query(delPostReplySql, [data.post_reply_id]);
        conn.release();

        return result[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 닉네임
export const searchNickname = async (user_id) => {
    const conn = await pool.getConnection();
    const result = await pool.query(searchNicknameSql, [user_id]);
    console.log(result[0][0]);
    conn.release();
    return result[0][0].nickname;
}