import { pool } from "../../config/db.config.js";
import { response} from "../../config/response.js";
import { transporter } from "../../config/email.config.js";
import { status } from "../../config/response.status.js";
import {confirmEmailSql, insertUserSql, checkUserkSql, updateUserPwSql, getStoredPw} from "./user.sql.js";
import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();

const emailVerificationMap = new Map(); // 이메일과 인증코드를 저장할 Map
const emailCooldownMap = new Map(); // 이메일에 대한 쿨다운 정보를 저장할 Map

const MAX_RESEND_LIMIT = 5; // 하루 최대 재전송 횟수
const COOLDOWN_DURATION = 24 * 60 * 60 * 1000; // 재전송 제한 시간
const EXPIRATION_DURATION = 3 * 60 * 1000; // 인증코드 유효 시간 (3분)

const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
};

const expireCodeAndCooldown = (email) => {
    // 이메일의 인증코드와 쿨다운 정보를 만료시킴
    emailVerificationMap.delete(email);
    emailCooldownMap.delete(email);
};

const resetCooldown = (email) => {
    // 이메일의 쿨다운 정보를 초기화
    const now = Date.now();
    emailCooldownMap.set(email, { count: 0, lastSent: 0 });
};


const sendVerificationCode = async (email, code) => {
    try {
        await transporter.sendMail({
            from: `"우주정거장" <${process.env.MAIL_USER}>`,
            to: email,
            subject: '우주정거장 비밀번호 변경 인증번호입니다.',
            text: `인증번호: ${code}`
        });
        console.log(`인증코드를 ${email}로 전송했습니다.`);
    } catch (err) {
        console.error('이메일 전송 중 오류 발생 : ', err);
        throw err;
    }
};

export const sendCode = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [checkUser] = await pool.query(checkUserkSql, [data.name, data.email]);

        if (checkUser[0].isExistUser) {
            const now = Date.now();
            const cooldownInfo = emailCooldownMap.get(data.email) || { count: 0, lastSent: 0 };

            if (now - cooldownInfo.lastSent >= COOLDOWN_DURATION) {
                // 24시간이 지났으면 쿨다운 정보 초기화
                resetCooldown(data.email);
            }
            if (cooldownInfo.count < MAX_RESEND_LIMIT) {
                const verificationCode = generateRandomCode();

                // 이메일과 인증코드를 Map에 저장
                emailVerificationMap.set(data.email, { code: verificationCode, timestamp: now });

                // 쿨다운 정보를 Map에 저장
                emailCooldownMap.set(data.email, { count: cooldownInfo.count + 1, lastSent: now });

                await sendVerificationCode(data.email, verificationCode);

                conn.release();
                console.log("메일로 인증 메일이 전송되었습니다.");
                return response(status.SUCCESS, { message: "인증 메일이 전송되었습니다." });
            } else {
                console.log("하루 인증 메일 재전송 횟수 초과입니다.");
                return response(status.BAD_REQUEST, { message: "하루 인증 메일 재전송 횟수 초과입니다." });
            }
        } else {
            console.log("가입된 사용자가 없습니다.");
            return response(status.BAD_REQUEST, { message: "가입된 사용자가 없습니다." });
        }
    } catch (err) {
        console.error(err);
        return response(status.INTERNAL_SERVER_ERROR, { message: "서버 에러" });
    }
};

export const resendCode = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [checkUser] = await pool.query(checkUserkSql, [data.name, data.email]);

        if (checkUser[0].isExistUser) {
            const now = Date.now();
            const cooldownInfo = emailCooldownMap.get(data.email);

            if (cooldownInfo && now - cooldownInfo.lastSent < COOLDOWN_DURATION && cooldownInfo.count >= MAX_RESEND_LIMIT) {
                console.log("하루 인증 메일 재전송 횟수 초과입니다.");
                return response(status.BAD_REQUEST, { message: "하루 인증 메일 재전송 횟수 초과입니다." });
            }

            const verificationCode = generateRandomCode();

            // 이메일과 인증코드를 Map에 저장
            emailVerificationMap.set(data.email, { code: verificationCode, timestamp: now });

            // 쿨다운 정보를 Map에 업데이트
            emailCooldownMap.set(data.email, { count: (cooldownInfo ? cooldownInfo.count : 0) + 1, lastSent: now });

            await sendVerificationCode(data.email, verificationCode);

            conn.release();
            console.log("메일로 인증메 일이 재전송되었습니다.");
            return response(status.SUCCESS, { message: "인증 메일이 재전송되었습니다." });
        } else {
            console.log("가입된 사용자가 없습니다.");
            return response(status.BAD_REQUEST, { message: "가입된 사용자가 없습니다." });
        }
    } catch (err) {
        console.error(err);
        return response(status.INTERNAL_SERVER_ERROR, { message: "서버 에러" });
    }
};

export const checkCode = async (req, data) => {
    try {
        // 이메일과 코드 확인
        const email = data.email;
        const enteredCode = data.code;

        const sendedCode = emailVerificationMap.get(email);

        if (!sendedCode || sendedCode.code !== enteredCode) {
            return { status: -1, message: "인증 번호가 올바르지 않습니다." };
        }

        // 현재 시간과 인증 코드의 타임스탬프를 비교하여 유효 기간 확인
        const currentTime = Date.now();
        const codeTimestamp = sendedCode.timestamp;
        const expirationDuration = EXPIRATION_DURATION; // 인증 코드의 유효 기간 (예: 3분)

        if (currentTime - codeTimestamp > expirationDuration) {
            return { status: -1, message: "인증 번호의 유효 기간이 초과되었습니다." };
        }
        req.session.email = email;
        console.log(req.session.email);
        expireCodeAndCooldown(email);
        return { status: 1, message: "인증 성공하였습니다." };
    } catch (error) {
        // 예외 처리
        console.error(error);
        throw error;
    }
};


const createdHash = process.env.createdHash;
const digest = process.env.digest;
export const updatePW = async (req, data) => {
    try {
        const email = req.session.email
        console.log(email);
        const conn = await pool.getConnection();

        const [storedpwinfo] = await pool.query(getStoredPw, [email]);
        // 데이터베이스에서 사용자 정보 조회
        const checkhashedPw = crypto
            .createHash(createdHash)
            .update(data.pw + storedpwinfo[0].salt)
            .digest(digest);


        if (checkhashedPw.substring(0, 100) !== storedpwinfo[0]) {
           return { status: -1, message: "변경하려는 비밀번호가 기존 비밀번호와 동일합니다." }
        }

        const salt = crypto.randomBytes(128).toString('base64');
        const hashedPw = crypto
            .createHash(createdHash)
            .update(data.pw + salt)
            .digest(digest);

        const updatePW = await pool.query(updateUserPwSql, [hashedPw, new Date(), salt, email]);

        conn.release();
        console.log('비밀번호 변경이 완료되었습니다.')
        return 1
    } catch (err) {
        console.error(err);
        return { status: -1, message: "서버 에러" }
    }
}