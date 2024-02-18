import { pool } from "../../config/db.config.js";
import { addCommentSql, deleteCommentSql, getCommentSql, getCommentUserSql, getReferenceSql, patchCommentSql } from "./comment.sql.js";
import { referenceDto, refererenceDateDto } from "../dtos/comment.dto.js";


// 인용할 글 불러오기
export const getReference = async (post_id) => {
    const conn = await pool.getConnection();

    const result = await conn.query(getReferenceSql, [post_id]);

    conn.release();
    console.log("result[0][0]: ", result[0][0]);
    if (!result[0][0]) return "삭제된 글입니다.";
    else return referenceDto(result[0][0]);
};

// 인용하기
export const addComment = async (post_id, body, user_id) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(addCommentSql, [
            null, 
            user_id,      
            body.content,    
            post_id, 
            new Date()
        ]);

        conn.release();

        return { "comment_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
};

// 글 조회
export const getComment = async (commemt_id) => {
    try{
        const conn = await pool.getConnection();
        console.log("comment_id: ", commemt_id);

        const result = await conn.query(getCommentSql, [commemt_id]);

        console.log("result: ", result[0][0]);

        conn.release();

        return {"reference": await getReference(result[0][0].post_id), "comment": result[0][0]};
    } catch (err) {
        throw err;
    }
};

// 글 삭제
export const deleteComment = async (commemt_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(deleteCommentSql, [commemt_id]);

        conn.release();

        return "글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
};

// 글 수정
export const patchComment = async (commemt_id, data, user_id) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(patchCommentSql, [
            data.content,    
            new Date(),
            commemt_id,
            user_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};

// 유저 조회
export const getCommentUser = async (comment_id) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getCommentUserSql, [comment_id]);

        if(result.length == 0){
            return -1;
        }

        conn.release();
        return result;
        
    } catch (err) {
        throw err;
    }
}