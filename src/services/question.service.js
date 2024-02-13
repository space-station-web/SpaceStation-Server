import { getAnswer, postAnswer } from "../models/question.dao.js";


export const addAnswer = async (body) => {
    try {
        const postData = await postAnswer({
            "user_id": body.user_id, 
            "content": body.content
        });

        const getPostData = await getAnswer(postData.answer_id);

        return getPostData[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}