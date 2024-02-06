import { tempResponseDTO } from "../dtos/temp.response.dto.js";
import { flagResponseDTO } from "../dtos/temp.response.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPosts } from "../models/myposts.dao.js";
import { addFollow, removeFollow } from '../models/follow.dao.js';

const data = async ({userId}) => {
    const posts =  await getPosts(userId);
    return posts;
}

const add = async ({userId, followId}) => {
    const follow = await addFollow({userId, followId})
    return follow;
}

const remove = async ({id, userId, followId}) => {
    const follow = await removeFollow({id, userId, followId})
    return follow;
}


export default { data, add, remove }
