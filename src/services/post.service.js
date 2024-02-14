// post.service.js

import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { pool } from "../../config/db.config.js";
import { postResponseDTO } from "../dtos/post.dto.js";
import * as postDao from '../models/post.dao.js';
import { response } from "../../config/response.js";

// 전체 글 조회
export const getPosts = async ({orderColumn = 'created_at', orderDirection = 'desc', limit = 10, offset = 0}) => {
    try {
        const result = await postDao.getAllPosts({orderColumn, orderDirection, limit, offset})
        
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 생성
export const addNewPost = async (body, user_id) => {
    try {
        const postData = await postDao.writeContent({
            "user_id": user_id,
            "title": body.title, 
            "content": body.content,
            "visibility": body.visibility,
            "self_destructTime": body.self_destructTime,
            "topic_id": body.topic_id
        });

        const getPostData = await postDao.getPost(postData.post_id, user_id);

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 수정
export const updatePost = async (post_id, body, user_id) => {
    try {
        const upData = await postDao.updatePost({
            "title": body.title, 
            "content": body.content,
            "visibility": body.visibility,
            "self_destructTime": body.self_destructTime
        }, post_id, user_id);

        const getPostData = await postDao.getPost(post_id, user_id);

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
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

// 유저의 모든 이웃의 글 조회
export const getFollowPostsByUserID = async(userId) => {
    try {
        const posts = await postDao.getFollowPostsByUserID(userId);
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}