import express from "express";
import { emailcheck } from "../controllers/emailcheck.controller.js";

export const emailcheckRouter = express.Router();

emailcheckRouter.post('/', emailcheck)