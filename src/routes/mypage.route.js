import express from 'express';
import { mypageData, mypageFollow } from '../controllers/mypage.controller.js';

export const mypageRouter = express.Router();

// ?type=1 내 글  ?type=2 질문함
mypageRouter.get('/', mypageData);

// mypage/follow?limit=0 전체 목록
mypageRouter.get('/follow', mypageFollow);

