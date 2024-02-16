import express from 'express';
import { likeBookPost, likeBookDelete,
         likePostPost, likePostDelete } from '../controllers/like.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const likeRouter = express.Router();

// 책 좋아요 생성
likeRouter.post('/books/:bookId', tokenChecker, likeBookPost);

// 책 좋아요 삭제
likeRouter.delete('/books/:bookId', tokenChecker, likeBookDelete);


// 글 좋아요 생성
likeRouter.post('/posts/:postId', tokenChecker, likePostPost);

// 글 좋아요 삭제
likeRouter.delete('/posts/:postId', tokenChecker, likePostDelete);