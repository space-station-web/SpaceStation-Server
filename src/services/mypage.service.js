import { getPosts } from "../models/myposts.dao.js";
import { getQuestions } from "../models/questions.dao.js";
import { getFollowListByUserId } from "../models/follow.dao.js";

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

const follow = async ({userId, limit, offset}) => {
    const followList = await getFollowListByUserId({userId, limit, offset})
    return followList;
}

export default { data, follow }
