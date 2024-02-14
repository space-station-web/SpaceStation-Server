import express from 'express';
import { addStorageType, deleteStorageType, getStorageType } from '../controllers/storagetype.controller.js';
import { tokenChecker } from '../../config/jwt-util.js';

export const storageTypeRouter = express.Router();

// 보관함 타입 생성
storageTypeRouter.post('/', tokenChecker, addStorageType);

// 보관함 타입 삭제
storageTypeRouter.delete('/:storageTypeId', tokenChecker, deleteStorageType);

// 보관함 타입 조회
storageTypeRouter.get('/', tokenChecker, getStorageType)