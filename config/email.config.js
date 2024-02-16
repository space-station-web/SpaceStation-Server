import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();


export const transporter = nodemailer.createTransport({
    service: 'gmail',  // 사용하고자 하는 서비스
    host: 'smtp.gmail.com', // host를 gmail로 설정
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER, // Gmail 주소 입력
        pass: process.env.MAIL_PASSWORD // 앱 비밀번호 입력
    }
})