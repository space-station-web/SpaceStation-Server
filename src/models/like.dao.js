import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { searchLikeBookSql, searchLikeBookCountSql,
         searchLikePostSql, searchLikePostCountSql,
         addLikeBookSql, delLikeBookSql, delLikeByBookIdSql, 
         addLikePostSql, delLikePostSql, delLikeByPostIdSql } from "./like.sql.js";

export const searchLikeBook = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchLikeBookSql, [data.book_id, data.user_id]);
        const resultCntSearch = await pool.query(searchLikeBookCountSql, [data.book_id]);
        conn.release();
        if (resultSearch[0][0] != null) {
            return {
                "bookLike": true,
                "bookLikeCount": resultCntSearch[0][0].cnt
            }; 
        } else {
            return {
                "bookLike": false,
                "bookLikeCount": resultCntSearch[0][0].cnt
            }; 
        } 
    }catch (err) {
        throw new BaseError(err);
    }
}         

export const searchLikePost = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchLikePostSql, [data.post_id, data.user_id]);
        const resultCntSearch = await pool.query(searchLikePostCountSql, [data.post_id]);
        conn.release();
        if (resultSearch[0][0] != null) {
            return {
                "postLike": true,
                "postLikeCount": resultCntSearch[0][0].cnt
            }; 
        } else {
            return {
                "postLike": false,
                "postLikeCount": resultCntSearch[0][0].cnt
            }; 
        } 
    }catch (err) {
        throw new BaseError(err);
    }
}   

export const addLikeBook = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchLikeBookSql, [data.book_id, data.user_id]);
        if (resultSearch[0][0] != null) {
            conn.release();
            return { "LikeBookId": resultSearch[0][0].book_like_id }; 
        }
        const resultLike = await pool.query(addLikeBookSql, [null, data.book_id, data.user_id]);
        conn.release();

        return { "likeBookId": resultLike[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delLikeBook = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultLike = await pool.query(delLikeBookSql, [data.book_id, data.user_id]);
        conn.release();

        return resultLike[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 책 일련번호로 그 책의 좋아요 전체 삭제 (삭제된 좋아요수 반환)
export const delLikeByBookId = async (bookId) => {
    try {
        const conn = await pool.getConnection();
        console.log("delLikeByBookId : " + bookId);
        const resultLike = await pool.query(delLikeByBookIdSql, [bookId]);
        conn.release();

        return resultLike[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addLikePost = async (data) => {
    try{
        const conn = await pool.getConnection();
        const resultSearch = await pool.query(searchLikePostSql, [data.post_id, data.user_id]);
        if (resultSearch[0][0] != null) {
            conn.release();
            return { "likePostId": resultSearch[0][0].post_like_id }; 
        }
        const resultLike = await pool.query(addLikePostSql, [null, data.post_id, data.user_id]);
        conn.release();

        return { "likePostId": resultLike[0].insertId };  
    }catch (err) {
        throw new BaseError(err);
    }
}

export const delLikePost = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultLike = await pool.query(delLikePostSql, [data.post_id, data.user_id]);
        conn.release();

        return resultLike[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 글 일련번호로 그 글의 좋아요 전체 삭제 (삭제된 좋아요수 반환)
export const delLikeByPostId = async (postId) => {
    try {
        const conn = await pool.getConnection();
        console.log("delLikeByPostId : " + postId);
        const resultLike = await pool.query(delLikeByPostIdSql, [postId]);
        conn.release();

        return resultLike[0].affectedRows; 
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
