import express from 'express';
import { bookCreate, bookRead, bookUpdate, bookDelete } from '../controllers/book.controller.js';

export const bookRouter = express.Router();

// 책 생성
bookRouter.post('/', bookCreate);

// 책 상세조회
bookRouter.get('/:bookId/:userId', bookRead);

// 책 수정
bookRouter.patch('/:bookId', bookUpdate);

// 책 삭제
bookRouter.delete('/:bookId', bookDelete);