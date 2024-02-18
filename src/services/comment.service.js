import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import * as commentDao from '../models/comment.dao.js';


// 인용하기
export const addComment = async (post_id, body, user_id) => {
    try {
        const postData = await commentDao.addComment(post_id, {
            "content": body.content
        }, user_id);

        const getCommentData = (await commentDao.getComment(postData.comment_id, user_id)).comment;

        console.log("Data: ", getCommentData);
        return getCommentData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 글 수정
export const patchComment = async (comment_id, body, user_id) => {
    const commentUser = await commentDao.getCommentUser(comment_id)

    if (commentUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }
    const commentData = await commentDao.patchComment(comment_id, {
        "content": body.content
    }, user_id);

    const getCommentData = (await commentDao.getComment(comment_id, user_id)).comment;

    return getCommentData;
};

// 글 삭제
export const deleteComment = async (comment_id, user_id) => {
    const commentUser = await commentDao.getCommentUser(comment_id)

    if (commentUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }
    
    const deleteCommentData = await commentDao.deleteComment(comment_id);

    return deleteCommentData;
}