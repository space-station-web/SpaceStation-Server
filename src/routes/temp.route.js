import express from 'express';
import { tempTest } from '../controllers/temp.controller.js';
import { tempException } from '../controllers/temp.controller.js';

export const tempRouter = express.Router();

tempRouter.get('', tempTest);
tempRouter.get('/test', tempTest);
tempRouter.get('/exception/:flag', tempException);
