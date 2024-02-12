import express from "express";
import { pwchange, codesend, codecheck } from "../controllers/emailauth.controller.js";

export const emailauthRouter = express.Router();

emailauthRouter.post('/', codesend)
emailauthRouter.post('/verify', codecheck)

export const changepwRouter = express.Router();

changepwRouter.post('/', pwchange)
