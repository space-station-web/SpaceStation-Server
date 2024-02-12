// post.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { getPosts, addPost, deletePost, editPost, getPost, getPostsByUserId, getFollowPosts } from '../controllers/post.controller.js';
import { tokenChecker } from "../../config/jwt-util.js";

export const postRouter = express.Router();

// 전체 글 조회
postRouter.get('/', asyncHandler(getPosts))

// 글 생성
postRouter.post('/', asyncHandler(addPost));

// 글 삭제
postRouter.delete('/:post_id', asyncHandler(deletePost));

// 내 모든 이웃의 글 조회
postRouter.get('/follow-posts', tokenChecker, asyncHandler(getFollowPosts))

// 글 조회
postRouter.get('/:post_id', asyncHandler(getPost));

// 글 수정
postRouter.patch('/:post_id', asyncHandler(editPost));

// 유저의 글 리스트 조회
postRouter.get('/user/:user_id', asyncHandler(getPostsByUserId))
