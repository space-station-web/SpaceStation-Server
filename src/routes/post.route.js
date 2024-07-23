// post.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { getPosts, searchPost, addPost, deletePost, editPost, getPost, getPostsByUserId, getFollowPosts, getTopic } from '../controllers/post.controller.js';
import { tokenChecker } from "../../config/jwt-util.js";
import { imageUploader } from "../middleware/image.uploader.js";
import { postImg } from "../models/post.dao.js";

export const postRouter = express.Router();

// 전체 글 조회
postRouter.get('/', tokenChecker, asyncHandler(getPosts));

// 글감 제공
postRouter.get('/topics', tokenChecker, getTopic);

// 글 생성
postRouter.post('/', imageUploader.array('image', 10), tokenChecker, asyncHandler(addPost));

// 글 삭제
postRouter.delete('/:post_id', tokenChecker, asyncHandler(deletePost));

// 내 모든 이웃의 글 조회
postRouter.get('/follow-posts', tokenChecker, asyncHandler(getFollowPosts));

// 글 검색
postRouter.get('/search', tokenChecker, asyncHandler(searchPost));

// 글 조회
postRouter.get('/:post_id', tokenChecker, asyncHandler(getPost));

// 글 수정
postRouter.patch('/:post_id', imageUploader.array('image', 10), tokenChecker, asyncHandler(editPost));

// 특정 사용자의 글 조회
postRouter.get('/user/:user_id', tokenChecker, asyncHandler(getPostsByUserId));

// 유저의 글 리스트 조회
postRouter.get('/user/:user_id',tokenChecker, asyncHandler(getPostsByUserId));
