import express from 'express';
import { mypageData } from '../controllers/mypage.controller.js';

export const mypageRouter = express.Router();

mypageRouter.get('/', mypageData);
// mypageRouter.get('/exception/:flag', tempException);

