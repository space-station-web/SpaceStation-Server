// const express = require('express')   // common JS
import express from 'express'// ES6
import session from 'express-session'
import dotenv from 'dotenv';
import cors from 'cors';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

import { status } from './config/response.status.js';
import { signupRouter } from './src/routes/signup.route.js';
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
import { emailcheckRouter } from './src/routes/emailcheck.route.js';
import { loginRouter } from './src/routes/login.route.js';
import { mypageRouter } from './src/routes/mypage.route.js';

import { changepwRouter, emailauthRouter } from './src/routes/emailauth.route.js';


import { tempRouter } from './src/routes/temp.route.js';
import { followRouter } from './src/routes/follow.route.js'
import { bookRouter } from './src/routes/book.route.js';
import { storageRouter } from './src/routes/storage.route.js';

import { postRouter } from './src/routes/post.route.js';
import { questionRouter } from './src/routes/question.route.js';
import { draftRouter } from './src/routes/draft.route.js';

import { likeRouter } from './src/routes/like.route.js';
import { commentRouter } from './src/routes/comment.route.js';
import { storageTypeRouter } from './src/routes/storagetype.route.js';
import { replyRouter } from './src/routes/reply.route.js';

dotenv.config();

const app = express()

// app.use(cookieParser());
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

// app.use(session({
//     secret: process.env.session_secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/email-auth', emailauthRouter);


app.use('/signup', signupRouter);

app.use('/login', loginRouter);

app.use('/email-check', emailcheckRouter);

app.use('/changepw', changepwRouter);


app.use('/login', loginRouter);

app.use('/mypage', mypageRouter);


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

app.get('/', function (req, res) {
    res.send('Main');
})

// 테스트 API
app.use('/temp', tempRouter);


// swagger
app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(specs));


// 이웃 api
app.use('/follow', followRouter);

// 글쓰기 API
app.use('/posts', postRouter);

// 오늘의 질문 API
app.use('/questions', questionRouter)

// 책 API
app.use('/books', bookRouter);

// 보관 API
app.use('/storages', storageRouter);

// 임시저장 API
app.use('/drafts', draftRouter);

// 좋아요 API
app.use('/likes', likeRouter);

// 인용하기 API
app.use('/comments', commentRouter);

// 보관함 타입 API
app.use('/storagetype', storageTypeRouter)

// 댓글 API
app.use('/replies', replyRouter)