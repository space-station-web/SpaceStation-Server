import express from 'express';
import { bookCreate, bookRead, bookUpdate, bookDelete, bookImg } from '../controllers/book.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';
import { imageUploader } from '../middleware/image.uploader.js';


export const bookRouter = express.Router();

// 책 생성
bookRouter.post('/', tokenChecker, bookCreate);

// 책 상세조회
bookRouter.get('/:bookId', tokenChecker, bookRead);

// 책 수정
bookRouter.patch('/:bookId', tokenChecker, bookUpdate);

// 책 삭제
bookRouter.delete('/:bookId', tokenChecker, bookDelete);

// 책 사진 저장 테스트
bookRouter.post('/img', imageUploader.single('image'), bookImg);