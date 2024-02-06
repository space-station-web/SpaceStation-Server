// post.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { addPost, deletePost, editPost, getPost } from '../controllers/post.controller.js';

export const postRouter = express.Router();

// 글 생성
postRouter.post('/', asyncHandler(addPost));

// 글 삭제
postRouter.delete('/:post_id', asyncHandler(deletePost));

// 글 조회
postRouter.get('/:post_id', asyncHandler(getPost));

// 글 수정
postRouter.patch('/:post_id', asyncHandler(editPost));