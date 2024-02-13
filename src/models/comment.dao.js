import { pool } from "../../config/db.config.js";
import { addCommentSql, deleteCommentSql, getCommentSql, getReferenceSql, patchCommentSql } from "./comment.sql.js";
import { referenceDto, refererenceDateDto } from "../dtos/comment.dto.js";


// 인용할 글 불러오기
export const getReference = async (post_id) => {
    const conn = await pool.getConnection();

    const result = await conn.query(getReferenceSql, [post_id]);
    
    const referenceDate = refererenceDateDto(result[0][0].created_at);
    conn.release();

    return referenceDto(result[0][0], referenceDate.date);
};

// 인용하기
export const addComment = async (post_id, body) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(addCommentSql, [
            null, 
            body.user_id,      
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

        const result = await conn.query(getCommentSql, [commemt_id]);

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
export const patchComment = async (commemt_id, data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(patchCommentSql, [
            data.content,    
            new Date(),
            commemt_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};