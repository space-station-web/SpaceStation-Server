// question.dao.js

import { BaseError } from "../../config/error.js";
import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getAnswerSql, getQnAnswerSql, getQuestionContent, getQuestionIdSql, postAnswerSql, getUserAnswerSql, checktodayAnswerSql, getAnswerUserSql, deleteAnswerSql, updateAnswerSql } from "./question.sql.js";
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

        //console.log('result:', result[0])

        conn.release();

        return getqnaDTO(result[0]);
    } catch (error) {
        throw err;
    }
}


export const getExistingAnswer = async (user_id) => {
    try {
        const conn = await pool.getConnection();
        const todayQuestionId = await pool.query(getQuestionIdSql);

        // Check if the user has already answered the question today
        const existingAnswer = await pool.query(checktodayAnswerSql, [todayQuestionId[0][0].question_id, user_id]);
        console.log("existingAnswer: ", existingAnswer[0]);
        console.log("existingAnswer[0][0].length: ", existingAnswer[0].length);
        return existingAnswer[0];
    } catch(error) {
        throw error;
    }
}

// 답변 삭제
export const deleteAnswer = async (answer_id) => {
    try{
        const conn = await pool.getConnection();

        const postResult = await conn.query(deleteAnswerSql, [answer_id]);
        
        conn.release();

        return "글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
};

// 답변 수정
export const patchAnswer = async (data, answer_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(updateAnswerSql, [      
            data.content,
            new Date(),    
            answer_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
};

// 유저 조회
export const getAnswerUser = async (answer_id) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getAnswerUserSql, [answer_id]);

        if(result.length == 0){
            return -1;
        }

        console.log("result: ", result);

        conn.release();
        return result;
        
    } catch (err) {
        throw err;
    }
}