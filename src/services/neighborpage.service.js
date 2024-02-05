import { tempResponseDTO } from "../dtos/temp.response.dto.js";
import { flagResponseDTO } from "../dtos/temp.response.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPosts } from "../models/posts.dao.js";

const data = async ({userId}) => {
    const posts =  await getPosts(userId);
    return posts;
}

export default { data }
