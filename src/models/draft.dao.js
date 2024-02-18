import { pool } from "../../config/db.config.js";
import { draftImgResponseDTO } from "../dtos/draft.dto.js";
import { addDraftSql, deleteDraftImgSql, deleteDraftSql, draftImgSql, getAllDraftSql, getDraftImgSql, getDraftSql, getDraftUserSql, postDraftSql, updateDraftSql } from "./draft.sql.js";

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
export const patchDraft = async (user_id, draft_id, data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(updateDraftSql, [
            data.title,    
            data.content,    
            new Date(),
            draft_id,
            user_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};

// 임시저장 글 수정 후 저장
export const postDraft = async (data, user_id) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(postDraftSql, [
            null, 
            user_id,
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
        const postImg = await conn.query(deleteDraftImgSql, [draft_id]);

        conn.release();

        return "임시저장 글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
};

// 임시저장 전체 조회
export const getAllDraft = async (user_id) => {
    const conn = await pool.getConnection();

    const result = await pool.query(getAllDraftSql, [user_id]);

    conn.release();

    console.log("result: ", result[0]);
    return result[0];
};

// 임시저장 상세 조회
export const getDraft = async (draft_id) => {
    const conn = await pool.getConnection();

    const result = await conn.query(getDraftSql, [draft_id]);
    const resultImg = await conn.query(getDraftImgSql, [draft_id]); // 사진
    
    conn.release();

    console.log("dto: ", draftImgResponseDTO(result[0][0], resultImg[0]));
    return draftImgResponseDTO(result[0][0], resultImg[0]);
};

// 유저 조회
export const getDraftUser = async (draft_id) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getDraftUserSql, [draft_id]);

        if(result.length == 0){
            return -1;
        }

        conn.release();
        return result;
    } catch (err) {
        throw err;
    }
}

// 이미지 업로드
export const draftImg = async(imagedata) => {
    const conn = await pool.getConnection(); 

    let resultContentImg = 0;
    console.log("length: ", imagedata.image.length);
        if ((imagedata.image != []) && (imagedata.draft_id != -1)) {
            for (let i = 0; i < imagedata.image.length; i++) {    // 사진 저장
                const img = imagedata.image[i];
                const result = await pool.query(draftImgSql, 
                    [null, img.location, imagedata.draft_id]); 
                if (result != -1) {
                    resultContentImg++;
                }
            }
        }
    conn.release();
}