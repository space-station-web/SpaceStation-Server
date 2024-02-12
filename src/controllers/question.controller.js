import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getAnswer, getQnAnswer, getQuestion, getUserAnswer } from '../models/question.dao.js';
import { addAnswer } from "../services/question.service.js";

// 질문 제공
export const todayQuestion = async (req, res, next) => {
    console.log("오늘의 질문 요청");

    res.send(response(status.SUCCESS, await getQuestion()));
};

// 답변
export const postAnswer = async (req, res, next) => {
    console.log("답변");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await addAnswer(req.body)));
};

// 답변 조회
export const todayAnswer = async (req, res, next) => {
    console.log("답변 조회");

    const { qeustion_id } = req.params;

    res.send(response(status.SUCCESS, await getQnAnswer(qeustion_id)));
};

// 내 답변 조회
export const getMyAnswer = async (req, res) => {
    const { userId } = req;
    const { limit, offset } = req.query;
    if(!userId) {
        res.status(401).send();
    }
    res.send(response(status.SUCCESS, await getUserAnswer({limit:Number(limit), offset:Number(offset), userId:Number(userId) })))
}