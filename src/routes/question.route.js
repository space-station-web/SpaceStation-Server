// question.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { postAnswer, todayAnswer, todayQuestion } from '../controllers/question.controller.js';

export const questionRouter = express.Router();

questionRouter.get('/', asyncHandler(todayQuestion));

questionRouter.post('/:question_id/answer', asyncHandler(postAnswer));

questionRouter.get('/:question_id/answer', asyncHandler(todayAnswer));
