import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import * as commentService from '../services/comment.service.js';
import * as commentDao from '../models/comment.dao.js';

// 인용할 글 불러오기
export const getReference = async (req, res, next) => {
    console.log("인용할 글 불러오기");

    const { post_id } = req.params;

    return res.send(response(status.SUCCESS, await commentDao.getReference(post_id)));
};  

// 인용 글 작성
export const addComment = async (req, res, next) => {
    console.log("인용 글 작성");
    console.log("body:", req.body);
    console.log("유저: ", req.userID);

    const { post_id } = req.params;

    return res.send(response(status.SUCCESS, await commentService.addComment(post_id, req.body, req.userID)));
};

// 인용 글 조회
export const getComment = async (req, res, next) => {
    console.log("인용 글 조회");

    const { comment_id } = req.params;

    return res.send(response(status.SUCCESS, await commentDao.getComment(comment_id)));
};

// 인용 글 삭제
export const deleteComment = async (req, res, next) => {
    console.log("인용 글 삭제");

    const { comment_id } = req.params;

    return res.send(response(status.SUCCESS, await commentService.deleteComment(comment_id, req.userID)));
};

// 인용 글 수정
export const patchComment = async (req, res, next) => {
    console.log("인용 글 수정");
    console.log("body:", req.body);
    console.log("유저: ", req.userID);

    const { comment_id } = req.params;

    return res.send(response(status.SUCCESS, await commentService.patchComment(comment_id, req.body, req.userID)));
};