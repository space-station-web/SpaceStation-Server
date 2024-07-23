import express from 'express';
import { bookReplyPost, bookReplyGet, bookReplyDelete,
         postReplyPost, postReplyGet, postReplyDelete } from '../controllers/reply.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const replyRouter = express.Router();

// 책 댓글 생성
replyRouter.post('/books', tokenChecker, bookReplyPost);

// 책 댓글 조회
replyRouter.get('/books', bookReplyGet);

// 책 댓글 삭제
replyRouter.delete('/books', tokenChecker, bookReplyDelete);


// 글 댓글 생성
replyRouter.post('/posts', tokenChecker, postReplyPost);

// 글 댓글 조회
replyRouter.get('/posts', postReplyGet);

// 글 댓글 삭제
replyRouter.delete('/posts', tokenChecker, postReplyDelete);