import express from "express";
import { userFind } from "../controllers/mypage.controller.js";

export const userRouter = express.Router();

userRouter.get('/:userId', userFind)