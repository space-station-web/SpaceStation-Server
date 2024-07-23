import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import * as questionDao from "../models/question.dao.js";


export const addAnswer = async (body, user_id) => {
    const existingAnswerData = await questionDao.getExistingAnswer(user_id);
    
    console.log("existingAnswerData.length: ", existingAnswerData.length);
    if(existingAnswerData.length > 0) {
        throw new BaseError(status.QUESTION_ANSWER_ALREADY);
    }
    const postData = await questionDao.postAnswer({
        "content": body.content
    }, user_id);

    const getPostData = await questionDao.getAnswer(postData.answer_id, user_id);

    return getPostData[0];
}

// 답변 삭제
export const deleteAnswer = async (answer_id, user_id) => {
    const postUser = await questionDao.getAnswerUser(answer_id)
    if (postUser[0][0].user_id != user_id) {
        throw new BaseError(status.QUESTION_UNAUTHORIZED);
    }

    const deleteData = await questionDao.deleteAnswer(answer_id);

    if(deleteData == -1){
        throw new BaseError(status.NOT_DELETED);
    }else{
        return deleteData;
    }
};

// 답변 수정
export const patchAnswer = async (body, answer_id, user_id) => {
    console.log("answer_id: ", answer_id);
    const postUser = await questionDao.getAnswerUser(answer_id)
    if (postUser[0][0].user_id != user_id) {
        throw new BaseError(status.QUESTION_UNAUTHORIZED);
    }

    const upData = await questionDao.patchAnswer({
        "content": body.content
    }, answer_id);


    if(upData == -1){
        throw new BaseError(status.NOT_UPDATED);
    }else{
        return questionDao.getAnswer(answer_id, user_id);
    }

};