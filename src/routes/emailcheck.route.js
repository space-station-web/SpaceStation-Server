import express from "express";
import {  } from "../controllers/emailcheck.controller.js";

export const emailauthRouter = express.Router();

emailauthRouter.post('/', emailauth)