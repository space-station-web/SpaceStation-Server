import express from 'express';
import { mypageData, mypageFollow } from '../controllers/mypage.controller.js';

export const mypageRouter = express.Router();

mypageRouter.get('/', mypageData);
mypageRouter.get('/follow', mypageFollow)

