// post.controller.js
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import * as postService from '../services/post.service.js';
import * as postDao from "../models/post.dao.js";

// 전체 글 조회
export const getPosts = async (req, res) => {
    const { userID } = req;
    const { orderColumn, orderDirection, limit, offset } = req.query;
    const list = await postService.getPosts(userID,{orderColumn, orderDirection, limit, offset});
    return res.send(response(status.SUCCESS, list));
    
}

// 내 모든 이웃의 글 조회
export const getFollowPosts = async (req, res) => {
    const { userID } = req;
    
    const followPostList = await postService.getFollowPostsByUserID(userID);
    return res.send(response(status.SUCCESS, followPostList));
}

// 글 검색 기능 
export const searchPost = async (req, res) => {
    //const { userID } = req;
    const userID = 20;
    const { orderType, postSearchWord } = req.query; 
    // 로그인 인증 미들웨어 사용 x
    const searchList = await postService.searchPost(userID,{orderType, postSearchWord});
    return res.send(response(status.SUCCESS, searchList));
}


// 글 작성
export const addPost = async (req, res, next) => {
    console.log("글 작성");
    console.log("body:", req.body);
    console.log("유저: ", req.userID); 
    console.log("files", req.files);
    const files = req.files ?? []; 

    if (!req.body.title) return res.send(new BaseError(status.POST_TITLE_EMPTY));
    if (!req.body.content) return res.send(new BaseError(status.POST_CONTENT_EMPTY));
    if (req.body.content.length > 65535) return res.send(new BaseError(status.POST_CONTENT_TOO_LONG));
    if (!req.body.visibility) return res.send(new BaseError(status.POST_VISIBILITY_EMPTY));
    if (req.body.visibility == "터뜨리기" && !req.body.self_destructTime) return res.send(new BaseError(status.POST_TIME_EMPTY)); 

    return res.send(response(status.SUCCESS, await postService.addNewPost(req.body, req.userID, files)));
};

// 글 삭제
export const deletePost = async (req, res, next) => {
    console.log("글 삭제");

    const { post_id } = req.params;

    return res.send(response(status.SUCCESS, await postService.deletePost(post_id, req.userID)));
}


// 글 수정
export const editPost = async (req, res, next) => {
    console.log("글 수정");
    console.log("req.body: ", req.body);
    console.log("files", req.files);
    const files = req.files ?? []; 

    const { post_id } = req.params;

    if (!post_id) return res.send(new BaseError(status.POST_NOT_FOUND));
    if (!req.body.title) return res.send(new BaseError(status.POST_TITLE_EMPTY));
    if (!req.body.content) return res.send(new BaseError(status.POST_CONTENT_EMPTY));
    if (req.body.content.length > 65535) return res.send(new BaseError(status.POST_CONTENT_TOO_LONG));
    if (!req.body.visibility) return res.send(new BaseError(status.POST_VISIBILITY_EMPTY));
    if (req.body.visibility == "터뜨리기" && !req.body.self_destructTime) return res.send(new BaseError(status.POST_TIME_EMPTY));


    return res.send(response(status.SUCCESS, await postService.updatePost(post_id, req.body, req.userID, files)));
}

// 글 조회
export const getPost = async (req, res, next) => {
    console.log("글 조회");

    const { post_id } = req.params;

    return res.send(response(status.SUCCESS, await postService.getPost(post_id, req.userID)));
}

// 유저의 글 리스트 조회
export const getPostsByUserId = async (req, res) => {
    const { user_id } = req.params;
    const { limit, offset } = req.query;
    return res.send(response(status.SUCCESS, await postService.getPostsByUserId({limit: Number(limit), offset: Number(offset), userId: Number(user_id)})));
}

// 글감 제공
export const getTopic = async (req, res, next) => {
    console.log("글감 제공");

    console.log("유저: ", req.userID);

    return res.send(response(status.SUCCESS, await postDao.getRandomTopic(req.userID)));
}

export const postImg = async (req, res, next) => {
    console.log("body", req.body);
    console.log("files", req.file);
    const test = req.files ?? []; 

    res.send(response(status.SUCCESS, {"body": req.body, "files": req.file}));
};