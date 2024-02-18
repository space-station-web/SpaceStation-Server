import express from 'express';
import { storageBookPost, storageBookDelete,
         storagePostPost, storagePostTypeGet, storagePostDelete, 
         getMyPostStorage} from '../controllers/storage.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';
export const storageRouter = express.Router();

// 책 보관 생성
storageRouter.post('/books/:bookId', tokenChecker, storageBookPost);

// 책 보관 삭제
storageRouter.delete('/books/:bookId', tokenChecker, storageBookDelete);

// 글 보관 생성
storageRouter.post('/posts/:postId', tokenChecker, storagePostPost);

// 글 보관 정보 조회
storageRouter.get('/posts/types', tokenChecker, storagePostTypeGet);

// 글 보관 삭제
storageRouter.delete('/posts/:postId', tokenChecker, storagePostDelete);

// 내 보관함 글 조회
storageRouter.get('/my-post-storage', tokenChecker, getMyPostStorage);
