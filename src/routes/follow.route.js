import express from 'express';
import {add, remove, followListByUserId} from '../controllers/follow.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const followRouter = express.Router();

 followRouter.use(tokenChecker)

// 추가
followRouter.post('/', add);

// 삭제
followRouter.delete('/', remove);

// 유저의 이웃 조회
followRouter.get('/user/:user_id', followListByUserId);
