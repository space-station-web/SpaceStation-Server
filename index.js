// const express = require('express')   // common JS
import express from 'express'          // ES6
import dotenv from 'dotenv';
import cors from 'cors';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

import { loginRouter } from './src/routes/login.route.js';

import { tempRouter } from './src/routes/temp.route.js';


dotenv.config();

const app = express()

// app.use(cookieParser());
app.set('port', process.env.PORT || 8080)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/login', loginRouter);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})


app.use('/temp', tempRouter);


// swagger
app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(specs));