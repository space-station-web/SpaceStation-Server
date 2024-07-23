import express from 'express';
import { addStorageType, deleteStorageType, getStorageType } from '../controllers/storagetype.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const storageTypeRouter = express.Router();

storageTypeRouter.use(tokenChecker)

// 보관함 타입 조회
storageTypeRouter.get('/user/:userId', getStorageType);

// 보관함 타입 생성
storageTypeRouter.post('/', addStorageType);

// 보관함 타입 삭제
storageTypeRouter.delete('/:storageTypeId', deleteStorageType);
 