// post.service.js
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { pool } from "../../config/db.config.js";
import { postImgResponseDTO, postResponseDTO } from "../dtos/post.dto.js";
import * as postDao from '../models/post.dao.js';
import * as storageDao from '../models/storage.dao.js';
import { response } from "../../config/response.js";
import { searchLikePost } from "../models/like.dao.js";

// 전체 글 조회
export const getPosts = async (userID, {orderColumn = 'created_at', orderDirection = 'desc', limit = 10, offset = 0}) => {
    try {
        const result = await postDao.getAllPosts(userID, {orderColumn, orderDirection, limit, offset})
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 유저의 모든 이웃의 글 조회
export const getFollowPostsByUserID = async(userId,) => {
    try {
        const posts = await postDao.getFollowPostsByUserID(userId);
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 검색(게시판)
export const searchPost = async(userID,{orderType, postSearchWord}) => {
    try {
        const result = await postDao.getSearchPost(userID,{orderType, postSearchWord})
        return result;
    } catch (error) {
        throw error;
    }
}

// 글 생성
export const addNewPost = async (body, user_id, image) => {
    try {
        const postData = await postDao.writeContent({
            "user_id": user_id,
            "title": body.title, 
            "content": body.content,
            "visibility": body.visibility,
            "self_destructTime": body.self_destructTime
        });

        if(image != -1){
            const postImgData = await postDao.postImg({
                "image": image,
                "post_id": postData.post_id,
                "user_id": user_id
            })
        }

        const getPostData = await getPost(postData.post_id, user_id);
        console.log("getPostData.self_destructTime: ", getPostData.self_destructTime);

        if (getPostData.visibility == "터뜨리기") {
            const explodePostData = postDao.explodePost(postData.post_id, getPostData.self_destructTime);
            return explodePostData;
        }

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 수정
export const updatePost = async (post_id, body, user_id, image) => {
    const postUser = await postDao.getPostUser(post_id)
    if (postUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }

    const upData = await postDao.updatePost({
        "title": body.title, 
        "content": body.content,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    }, post_id, user_id);

    if(image != -1){
        const postImgData = await postDao.updateImg(image, post_id, user_id)
    }

    if(post_id == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return getPost(post_id, user_id);
    }
}

// 유저 글 리스트 조회
export const getPostsByUserId = async({ limit = 12, offset = 0, userId}) => {
    try {
    const posts = await postDao.getPostsByUserId({limit, offset, userId});
    return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



// 글 삭제
export const deletePost = async (post_id, user_id) => {
    const postUser = await postDao.getPostUser(post_id)
    if (postUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }

    const deleteData = await postDao.deletePost(post_id);

    if(deleteData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return deleteData;
    }
}

// 글 조회
export const getPost = async (post_id, user_id) => {
    const result = await postDao.getPost(post_id);
    const resultStorage = await storageDao.searchStoragePost({'post_id': post_id, 'user_id': user_id});
    const resultLike = await searchLikePost({"post_id": post_id, "user_id": user_id});
    const resultNickname = await postDao.searchNickname(result.body.user_id);
    console.log("resultLike: ", resultLike);

    console.log("dto: ", postImgResponseDTO(result.body, result.Img, resultLike, resultStorage, resultNickname))

    if(result == -1){
        throw new BaseError(status.BAD_REQUEST);
    } else {
        return postImgResponseDTO(result.body, result.Img, resultLike, resultStorage, resultNickname);
    }
}