import express from 'express';
import {neighborpageData} from '../controllers/neighborpage.controller.js';

export const neighborpageRouter = express.Router();

neighborpageRouter.get('/', neighborpageData);

