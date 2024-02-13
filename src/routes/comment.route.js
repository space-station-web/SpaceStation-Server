import express from "express";
import asyncHandler from 'express-async-handler';
import { addComment, deleteComment, getComment, getReference, patchComment } from "../controllers/comment.controller.js";

export const commentRouter = express.Router();

// 인용하는 글 조회
// commentRouter.get('/posts/:post_id', asyncHandler(getReference));

// 인용하기
commentRouter.post('/posts/:post_id', asyncHandler(addComment));

// 조회
commentRouter.get('/:comment_id', asyncHandler(getComment));

// 삭제
commentRouter.delete('/:comment_id', asyncHandler(deleteComment));

// 수정
commentRouter.patch('/:comment_id', asyncHandler(patchComment));
