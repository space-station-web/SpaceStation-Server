import * as draftDao from '../models/draft.dao.js';
import * as commentDao from '../models/comment.dao.js';


// 인용하기
export const addComment = async (post_id, body) => {
    try {
        const postData = await commentDao.addComment(post_id, {
            "user_id": body.user_id,
            "content": body.content
        });

        console.log("comment_id: ", postData.comment_id);

        const getCommentData = (await commentDao.getComment(postData.comment_id)).comment;

        console.log("Data: ", getCommentData);
        return getCommentData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 글 수정
export const patchComment = async (comment_id, body) => {
    const commentData = await commentDao.patchComment(comment_id, {
        "content": body.content
    });

    const getCommentData = (await commentDao.getComment(comment_id)).comment;

    return getCommentData;
};