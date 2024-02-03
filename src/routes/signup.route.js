import express from "express";
import { userSignup } from "../controllers/signup.controller.js";

export const signupRouter = express.Router();

signupRouter.post('/', userSignup)