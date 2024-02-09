import { getAnswer, postAnswer } from "../models/question.dao.js";


export const addAnswer = async (body) => {
    try {

        const postData = await postAnswer({
            "answer_id": body.answer_id,
            "content": body.content
        });

        console.log("postData: ", postData);

        const getPostData = await getAnswer(body.answer_id);

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}