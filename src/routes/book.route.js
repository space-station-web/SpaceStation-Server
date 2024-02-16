import express from 'express';
import { bookCreate, bookContentCreate, bookRead, bookUpdate, bookDelete, bookListRead } from '../controllers/book.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';
import { imageUploader } from '../middleware/book.image.js';


export const bookRouter = express.Router();

// 책 생성
bookRouter.post('/', tokenChecker, imageUploader.single('thumbnail'), bookCreate);

// 책 목차 생성
bookRouter.post('/:bookId/contents', tokenChecker, imageUploader.array('image', 10), bookContentCreate);

// 책 리스트 조회
bookRouter.get('/list', tokenChecker, bookListRead);

// 책 상세조회
bookRouter.get('/:bookId', tokenChecker, bookRead);

// 책 수정
bookRouter.patch('/:bookId', tokenChecker, bookUpdate);

// 책 목차 수정
bookRouter.patch('/:bookId/contents', tokenChecker, bookUpdate);

// 책 삭제
bookRouter.delete('/:bookId', tokenChecker, bookDelete);
