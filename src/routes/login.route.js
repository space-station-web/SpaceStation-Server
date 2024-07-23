import express from "express";
import {userLogin} from "../controllers/login.controller.js";

export const loginRouter = express.Router();
export const refreshRouter = express.Router();

loginRouter.post('/', userLogin)