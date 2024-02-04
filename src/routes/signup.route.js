import express from "express";
import { userSignup, checkNickname } from "../controllers/signup.controller.js";

export const signupRouter = express.Router();

signupRouter.post('/', userSignup)
signupRouter.get('/:nickname', checkNickname)
