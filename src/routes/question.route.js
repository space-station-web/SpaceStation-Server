// question.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { postAnswer, todayAnswer, todayQuestion, getMyAnswer, editAnswer, delAnswer } from '../controllers/question.controller.js';
import { tokenChecker } from "../../config/jwt-util.js";

export const questionRouter = express.Router();

questionRouter.get('/', asyncHandler(todayQuestion));

// 나의 오늘의 질문 모음
questionRouter.get('/my-answer', tokenChecker, asyncHandler(getMyAnswer));

questionRouter.post('/', tokenChecker, asyncHandler(postAnswer));

questionRouter.get('/:question_id', tokenChecker, asyncHandler(todayAnswer));

questionRouter.patch('/:answer_id', tokenChecker, asyncHandler(editAnswer));

questionRouter.delete('/:answer_id', tokenChecker, asyncHandler(delAnswer));
