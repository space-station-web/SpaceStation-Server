import { pool } from "../../config/db.config.js";
import { addDraftSql, deleteDraftSql, getAllDraftSql, getDraftSql, getUserIdSql, postDraftSql, updateDraftSql } from "./draft.sql.js";

// 임시저장
export const addDraft = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(addDraftSql, [
            null,
            data.user_id,
            data.title,      
            data.content,    
            new Date()
        ]);

        conn.release();

        return { "draft_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
};

// 임시저장 글 수정 후 임시저장
export const patchDraft = async (draft_id, data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(updateDraftSql, [
            data.title,    
            data.content,    
            new Date(),
            draft_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};

// 임시저장 글 수정 후 저장
export const postDraft = async (draft_id, data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(postDraftSql, [
            null, 
            data.user_id,
            data.title,      
            data.content,    
            data.visibility, 
            new Date(),
            data.self_destructTime
        ]);

        conn.release();

        return {"post_id": result[0].insertId};
    } catch (err) {
        throw err;
    }
};

// 임시저장 글 삭제
export const deleteDraft = async (draft_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(deleteDraftSql, [draft_id]);

        conn.release();

        return "임시저장 글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
};

// 임시저장 전체 조회
export const getAllDraft = async () => {
    const conn = await pool.getConnection();

    const result = await pool.query(getAllDraftSql);

    conn.release();

    console("result: ", result[0]);
    return result[0];
};

// 임시저장 상세 조회
export const getDraft = async (draft_id) => {
    const conn = await pool.getConnection();

    const result = await conn.query(getDraftSql, [draft_id]);
    
    conn.release();

    console.log(result[0]);

    return result[0];
};

// 임시저장 유저 조회
export const getUserId = async (draft_id) => {
    const conn = await pool.getConnection();
    
    const user_id = await conn.query(getUserIdSql, [draft_id]);

    conn.release();

    return user_id;
};