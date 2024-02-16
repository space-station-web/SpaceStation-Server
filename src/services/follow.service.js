import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addFollow, removeFollow, getFollowListByUserId } from '../models/follow.dao.js';

const data = async ({userId}) => { // 이웃페이지는 글모음만 보이니 설정 x(추후에 보관 기능 추가시 수정필요할수도)
    const posts =  await getPosts(userId);
    return posts;
};

const add = async ({userId, followId}) => {
    const follow = await addFollow({userId, followId})
    return follow;
};

const remove = async ({id, userId, followId}) => {
    const follow = await removeFollow({id, userId, followId})
    return follow;
};


const followListByUserId = async ({userId, limit = 12, offset = 0}) => {
    const followList = await getFollowListByUserId({userId, limit, offset})
    return followList;
};


export default { data, add, remove, followListByUserId };
