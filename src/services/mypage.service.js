import { tempResponseDTO } from "../dtos/temp.response.dto.js";
import { flagResponseDTO } from "../dtos/temp.response.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPosts } from "../models/posts.dao.js";
import { getQuestions } from "../models/questions.dao.js";

const data = async ({userId, type}) => {
    if (type === 1) {
        const posts =  await getPosts(userId);
        return posts;
    } else if (type === 2) {
        const questions = await getQuestions();
        return questions;
    } else {
        return -1;
    }

}

export default { data }
