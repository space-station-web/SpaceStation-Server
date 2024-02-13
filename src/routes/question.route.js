// question.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { postAnswer, todayAnswer, todayQuestion, getMyAnswer } from '../controllers/question.controller.js';
import { tokenChecker } from "../../config/jwt-util.js";

export const questionRouter = express.Router();

questionRouter.get('/', asyncHandler(todayQuestion));

questionRouter.get('/my-answer', tokenChecker, asyncHandler(getMyAnswer));

questionRouter.post('/answer', asyncHandler(postAnswer));

questionRouter.get('/:question_id/answer', asyncHandler(todayAnswer));
