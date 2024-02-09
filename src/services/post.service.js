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
export const addNewPost = async (body) => {
    try {
        const postData = await postDao.writeContent({
            "user_id": body.user_id,
            "title": body.title, 
            "content": body.content,
            "visibility": body.visibility,
            "self_destructTime": body.self_destructTime
        });

        const getPostData = await postDao.getPost(postData.post_id);

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 삭제
export const deletePost = async (post_id) => {
    try {
        const result = await postDao.deletePost(post_id);
        console.log(result);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 조회
export const getPost = async (post_id) => {
    try {
        const result = await postDao.getPost(post_id);
        
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 글 수정
export const updatePost = async (post_id, body) => {
    try {
        const upData = await postDao.updatePost({
            "title": body.title, 
            "content": body.content,
            "visibility": body.visibility,
            "self_destructTime": body.self_destructTime
        }, post_id);

        const getPostData = await postDao.getPost(post_id);

        return getPostData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 유저 글 리스트 조회
export const getPostsByUserId = async(user_id) => {
    try {
    const posts = await postDao.getPostsByUserId(user_id);
    return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}