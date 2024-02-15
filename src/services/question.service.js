import { getAnswer, postAnswer } from "../models/question.dao.js";


export const addAnswer = async (body, user_id) => {
    try {
        const postData = await postAnswer({
            "content": body.content
        }, user_id);

        const getPostData = await getAnswer(postData.answer_id, user_id);

        return getPostData[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}