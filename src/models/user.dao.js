import { pool, transporter } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { confirmEmailSql, insertUserSql, usercheckSql } from "./user.sql.js";
import nodemailer from 'nodemailer';

import crypto from 'crypto';

const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
};

const sendVerificationCode = async (email, code) => {
    const transporter = nodemailer.createTransport({
        serveice: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    const mailOption = {
        from: '',
        to: email,
        subject: '우주정거장 인증번호입니다.',
        text: `인증번호: ${code}`
    };

    try {
        await transporter.sendMail(mailOption);
        console.log(`인증코드를 ${email}로 전송했습니다.`);
    } catch (err) {
        console.error('이메일 전송 중 오류 발생 : ', err);
    }
};

export const sendCode = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [userCheck] = await pool.query(usercheckSql, data.name, data.email);

        if (userCheck[0].isExistUser) {
            const verificationCode = generateRandomCode();

            await sendVerificationCode(data.email, verificationCode);

            conn.release();
            console.log("메일로 인증메일이 전송되었습니다.")
        }
        else {
            console.log("가입된 사용자가 없습니다.")
            return -1
        }
    } catch (err) {
        console.error(err); // 에러 출력
        return -1; // 또는 다른 적절한 값을 반환
    }
};

export const resendCode = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [userCheck] = await pool.query(usercheckSql, data.name, data.email);

        if (userCheck[0].isExistUser) {
            const verificationCode = generateRandomCode();

            await sendVerificationCode(data.email, verificationCode);

            conn.release();
            console.log("메일로 인증메일이 재전송되었습니다.")
        }
        else {
            console.log("가입된 사용자가 없습니다.")
            return -1
        }
    } catch (err) {
        console.error(err); // 에러 출력
        return -1; // 또는 다른 적절한 값을 반환
    }
};

