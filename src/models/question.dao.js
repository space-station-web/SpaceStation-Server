// question.dao.js

import { BaseError } from "../../config/error.js";
import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getAnswerSql, getQnAnswerSql, getQuestionContent, getQuestionIdSql, postAnswerSql, getUserAnswerSql } from "./question.sql.js";
import { getqnaDTO } from '../dtos/question.dto.js'

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

        return questions[0];
    } catch (err) {
        throw err;
    }
};

// 답변
export const postAnswer = async (data, user_id) => {
    try {
        const conn = await pool.getConnection();
        
        const todayQuestionId = await pool.query(getQuestionIdSql);

        const result = await pool.query(postAnswerSql, [
            todayQuestionId[0][0].question_id,
            null, 
            user_id,
            data.content,
            new Date()
        ]);

        conn.release();

        return { "answer_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
};

// 답변 불러오기
export const getAnswer = async (answer_id, user_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(getAnswerSql, [answer_id, user_id]);

        conn.release();

        return result[0];
    } catch (err) {
        throw err;
    }
}

// 전체 조회
export const getQnAnswer = async (question_id, user_id) => {
    try{
        const conn = await pool.getConnection();

        // const todayQuestionId = await pool.query(getQuestionIdSql);

        const result = await conn.query(getQnAnswerSql, [question_id, user_id]);

        console.log("result: ", result[0][0]);

        conn.release();

        return result[0][0];
    } catch (err) {
        throw err;
    }
}

// 유저의 답변 조회 
export const getUserAnswer = async ({limit, offset, userId}) => {
    try {
        const conn = await pool.getConnection();
        console.log(userId, limit, offset)
        const result = await conn.query(getUserAnswerSql, [userId, limit, offset]);

        console.log('result:', result[0])

        conn.release();

        return getqnaDTO(result[0]);
    } catch (error) {
        throw err;
    }
}