import express from 'express';
import { storageBookPost, storageBookDelete,
         storagePostPost, storagePostDelete, getMyPostStorage } from '../controllers/storage.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const storageRouter = express.Router();

// 책 보관 생성
storageRouter.post('/books/:bookId', storageBookPost);

// 책 보관 삭제
storageRouter.delete('/books/:bookId', storageBookDelete);


// 글 보관 생성
storageRouter.post('/posts/:postId', storagePostPost);

// 글 보관 삭제
storageRouter.delete('/posts/:postId', storagePostDelete);

// 내 보관함 글 조회
storageRouter.get('/my-post-storage', tokenChecker, getMyPostStorage)