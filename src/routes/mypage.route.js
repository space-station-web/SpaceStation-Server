import express from "express";
import { userFind, changeNick, changeImg } from "../controllers/mypage.controller.js";

export const mypageRouter = express.Router();

mypageRouter.get('/:userId', userFind);

export const nicknameRouter = express.Router();

nicknameRouter.patch('/:userId', changeNick);

export const imageRouter = express.Router();

imageRouter.patch('/:userId', changeImg);