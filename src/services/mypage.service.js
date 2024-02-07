import { getPosts } from "../models/myposts.dao.js";
import { getQuestions } from "../models/myquestions.dao.js";
import { getFollowListByUserId } from "../models/follow.dao.js";

const data = async ({userId, type}) => { // 보관함 추가 시 type === 3 으로 진행할 것
    if (type === 1) { // type === 1 : 내글모음
        const posts =  await getPosts(userId);
        return posts;
    } else if (type === 2) { // type === 2 : 질문함
        const questions = await getQuestions();
        return questions;
    } else {
        return -1;
    }

};

const follow = async ({userId, limit, offset}) => {
    const followList = await getFollowListByUserId({userId, limit, offset})
    return followList;
};

export default { data, follow };
