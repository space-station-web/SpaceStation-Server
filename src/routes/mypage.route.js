import express from "express";
import { userFind, changeNick, changeImg } from "../controllers/mypage.controller.js";

export const mypageRouter = express.Router();

mypageRouter.get('/:userId', userFind);

mypageRouter.patch('/nickname/:userId', changeNick);

mypageRouter.patch('/image/:userId', changeImg);