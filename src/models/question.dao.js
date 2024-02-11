// question.dao.js

import { BaseError } from "../../config/error.js";
import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getAnswerSql, getQnAnswerSql, getQuestionContent, getQuestionIdSql, postAnswerSql } from "./question.sql.js";
import { getqnaDTO } from "../dtos/question.dto.js";

// 질문 제공
export const getQuestion = async (date) => {
    try {
        const conn = await pool.getConnection(); 
        const [questions] = await conn.query(getQuestionContent);
        console.log(questions);
        conn.release();

        if (!questions || !questions.length) {
            throw new BaseError(status.QUESTION_NOT_FOUND);
        };

        return questions;
    } catch (err) {
        throw err;
    }
};

// 답변
export const postAnswer = async (data) => {
    try {
        const conn = await pool.getConnection();
        
        const todayQuestionId = await pool.query(getQuestionIdSql);

        const result = await pool.query(postAnswerSql, [
            todayQuestionId[0][0].question_id,
            data.answer_id, 
            data.content,
            new Date()
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};

// 답변 불러오기
export const getAnswer = async (answer_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(getAnswerSql, [answer_id]);

        conn.release();

        return result[0];
    } catch (err) {
        throw err;
    }
}

// 전체 조회
export const getQnAnswer = async () => {
    try{
        const conn = await pool.getConnection();

        const todayQuestionId = await pool.query(getQuestionIdSql);

        const result = await conn.query(getQnAnswerSql, [todayQuestionId[0][0].question_id]);

        console.log("result: ", result[0]);
        console.log("dto: ", getqnaDTO(result[0]));

        conn.release();

        return getqnaDTO(result[0]);
    } catch (err) {
        throw err;
    }
}