import express from 'express';
import {add, remove, followListByUserId} from '../controllers/follow.controller.js';

export const followRouter = express.Router();

// 추가
followRouter.post('/', add);

// 삭제
followRouter.delete('/', remove);

// 유저의 이웃 조회
followRouter.get('/user/:user_id', followListByUserId);
