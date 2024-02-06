// const express = require('express')   // common JS
import express from 'express'          // ES6
import dotenv from 'dotenv';
import cors from 'cors';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import { status } from './config/response.status.js';

import { signupRouter } from './src/routes/signup.route.js';
import { emailcheckRouter } from './src/routes/emailcheck.route.js';

import { tempRouter } from './src/routes/temp.route.js';
import { mypageRouter } from './src/routes/mypage.route.js'
import { neighborpageRouter } from './src/routes/neighborpage.route.js'
import { bookRouter } from './src/routes/book.route.js';
import { postRouter } from './src/routes/post.route.js';


dotenv.config();

const app = express()

app.set('port', process.env.PORT || 8080)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.use('/signup', signupRouter);

app.use('/email-check', emailcheckRouter);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

app.get('/', function (req, res) {
    res.send('Main Api ');
})

// 테스트 API
app.use('/temp', tempRouter);

// 책 API
app.use('/books', bookRouter);


// swagger
app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(specs));


// 마이페이지
app.use('/mypage', mypageRouter);

// 이웃 페이지
app.use('/follow', neighborpageRouter);

// 나의 이웃 목록
// app.use('/mypage/follow', followRouter);

// 글쓰기 API
app.use('/posts', postRouter);


