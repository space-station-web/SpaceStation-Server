import express from 'express';
import { storageBookPost, storageBookDelete,
         storagePostPost, storagePostDelete } from '../controllers/storage.controller.js';

export const storageRouter = express.Router();

// 책 보관 생성
storageRouter.post('/books/:bookId', storageBookPost);

// 책 보관 삭제
storageRouter.delete('/books/:bookId', storageBookDelete);


// 글 보관 생성
storageRouter.post('/posts/:postId', storagePostPost);

// 글 보관 삭제
storageRouter.delete('/posts/:postId', storagePostDelete);