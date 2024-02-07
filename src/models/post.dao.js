// post.dao.js

import { pool } from "../../config/db.config.js";
import { getLastPost, getUserID, insertPostSql, LastPost, deletePostSql, getPostSql, updatePostSql, getPostsByUserIdSql } from "./post.sql.js";

// 글 작성
export const writeContent = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertPostSql, [
            null, 
            data.user_id,
            data.title,      
            data.content,    
            data.visibility, 
            new Date(),
            data.self_destructTime
        ]);

        conn.release();

        return { "post_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
}


// 글 삭제
export const deletePost = async (post_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(deletePostSql, [post_id]);

        conn.release();

        return "글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
    
}

// 글 조회
export const getPost = async (post_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(getPostSql, [post_id]);


        conn.release();

        return result[0];
    } catch (err) {
        throw err;
    }
}

// 글 수정
export const updatePost = async (data, post_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(updatePostSql, [
            data.title,      
            data.content,    
            data.visibility,
            data.self_destructTime,
            post_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
}

// 유저의 글 리스트 조회
export const getPostsByUserId = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const myPosts = await pool.query(getPostsByUserIdSql, [userId]);
        if(myPosts.length == 0){
            return -1;
        }

        conn.release();
        return myPosts[0];
        
    } catch (err) {
        throw err;
    }
}
