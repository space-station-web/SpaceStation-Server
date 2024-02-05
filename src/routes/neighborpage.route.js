import express from 'express';
import {add, remove} from '../controllers/neighborpage.controller.js';

export const neighborpageRouter = express.Router();

neighborpageRouter.post('/', add);
neighborpageRouter.delete('/', remove);

