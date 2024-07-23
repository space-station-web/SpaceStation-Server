import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getAnswer, getQnAnswer, getQuestion, getUserAnswer } from '../models/question.dao.js';
import { addAnswer, deleteAnswer, patchAnswer } from "../services/question.service.js";

// 질문 제공
export const todayQuestion = async (req, res, next) => {
    console.log("오늘의 질문 요청");

    res.send(response(status.SUCCESS, await getQuestion()));
};

// 답변
export const postAnswer = async (req, res, next) => {
    console.log("답변");
    console.log("body: ", req.body);
    console.log("유저: ", req.userID);

    res.send(response(status.SUCCESS, await addAnswer(req.body, req.userID)));
};

// 답변 조회
export const todayAnswer = async (req, res, next) => {
    console.log("답변 조회");
    console.log("유저: ", req.userID);

    const { question_id } = req.params;

    res.send(response(status.SUCCESS, await getQnAnswer(question_id, req.userID)));
};

// 내 답변 조회
export const getMyAnswer = async (req, res) => {
    
    const { userID } = req;
    const { limit, offset } = req.query;
    if(!userID) {
        return res.status(401).send();
    }
    res.send(response(status.SUCCESS, await getUserAnswer({limit:Number(limit), offset:Number(offset), userId:Number(userID) })))
}

// 답변 삭제
export const delAnswer = async (req, res, next) => {
    console.log("답변 삭제");
    console.log("유저: ", req.userID);

    const { answer_id } = req.params;

    res.send(response(status.SUCCESS, await deleteAnswer(answer_id, req.userID)));
};

// 답변 수정
export const editAnswer = async (req, res, next) => {
    console.log("답변 수정");
    console.log("body: ", req.body);
    console.log("유저: ", req.userID);

    const { answer_id } = req.params;

    res.send(response(status.SUCCESS, await patchAnswer(req.body, answer_id, req.userID)));
};