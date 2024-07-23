import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { searchStorageBookSql, searchStoragePostSql,
         searchStoragePostTypeSql,
         addStorageBookSql, delStorageBookSql, delStorageByBookIdSql, 
         addStoragePostSql, delStoragePostSql, delStorageByPostIdSql,
         getPostStorageListByUserIdSql } from "./storage.sql.js";

export const searchStorageBook = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchStorageBookSql, [data.book_id, data.user_id, data.storage_type_id]);
        conn.release();
        if (resultSearch[0][0] != null) {
            console.log("storageBookId : " + resultSearch[0][0].book_storage_id);
            return true; 
        } else {
            return false; 
        } 
    }catch (err) {
        throw new BaseError(err);
    }
}         
         
export const addStorageBook = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchStorageBookSql, [data.book_id, data.user_id, data.storage_type_id]);
        if (resultSearch[0][0] != null) {
            conn.release();
            return { "storageBookId": resultSearch[0][0].book_storage_id }; 
        }
        const resultStorage = await pool.query(addStorageBookSql, [null, data.book_id, data.user_id, data.storage_type_id]);
        conn.release();

        return { "storageBookId": resultStorage[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delStorageBook = async (data) => {
    try {
        const conn = await pool.getConnection();
        console.log("dao delStorageBook : " + data.book_id +", "+ data.user_id);
        const resultStorage = await pool.query(delStorageBookSql, [data.book_id, data.user_id, data.storage_type_id]);
        conn.release();

        return resultStorage[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 책 일련번호로 그 책의 보관 전체 삭제 (삭제된 보관수 반환)
export const delStorageByBookId = async (bookId) => {
    try {
        const conn = await pool.getConnection();
        console.log("delStorageByBookId : " + bookId);
        const resultStorage = await pool.query(delStorageByBookIdSql, [bookId]);
        conn.release();

        return resultStorage[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const searchStoragePostType = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchStoragePostTypeSql, [data.post_id, data.user_id]);
        conn.release();

        return resultSearch;
    }catch (err) {
        throw new BaseError(err);
    }
}
export const addStoragePost = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchStoragePostSql, [data.post_id, data.user_id, data.storage_type_id]);
        if (resultSearch[0][0] != null) {
            conn.release();
            return { "storagePostId": resultSearch[0][0].post_storage_id }; 
        }
        const resultStorage = await pool.query(addStoragePostSql, [null, data.post_id, data.user_id, data.storage_type_id]);
        conn.release();

        return { "storagePostId": resultStorage[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delStoragePost = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultStorage = await pool.query(delStoragePostSql, [data.post_id, data.user_id, data.storage_type_id]);
        conn.release();

        return resultStorage[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 글 일련번호로 그 글의 보관 전체 삭제 (삭제된 보관수 반환)
export const delStorageByPostId = async (postId) => {
    try {
        const conn = await pool.getConnection();
        console.log("delStorageByPostId : " + postId);
        const resultStorage = await pool.query(delStorageByPostIdSql, [postId]);
        conn.release();

        return resultStorage[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 유저 보관함 글 조회
export const getPostStorageListByUserId = async ({limit, offset, storageType}) => {
    console.table([limit, offset])
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(getPostStorageListByUserIdSql, [storageType, limit, offset]);
        conn.release();

        if(result.length == 0){
            return -1;
        }

        return result[0]
    }catch (err) {
        throw new BaseError(err);
    }
}

// 글 보관 여부
export const searchStoragePost = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchStoragePostSql, [data.post_id, data.user_id]);
        conn.release();
        if (resultSearch[0][0] != null) {
            console.log("postId : " + resultSearch[0][0].post_storage_id);
            return true; 
        } else {
            return false; 
        } 
    }catch (err) {
        throw new BaseError(err);
    }
}  