import { pool } from "../../config/db.config.js";
import { response} from "../../config/response.js";
import { transporter } from "../../config/email.config.js";
import { status } from "../../config/response.status.js";


import { emailcheckSql, userCheckSql, checkUserSql,  confirmNicknameSql } from "./user.sql.js";
import jwtUtil from "../../config/jwt-util.js";

import {confirmEmailSql, insertUserSql, updateUserPwSql, getStoredPw, getUserId} from "./user.sql.js";
import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();

const createdHash = process.env.createdHash;
const digest = process.env.digest;


const emailVerificationMap = new Map(); // 이메일과 인증코드를 저장할 Map
const emailCooldownMap = new Map(); // 이메일에 대한 쿨다운 정보를 저장할 Map

const MAX_RESEND_LIMIT = 5; // 하루 최대 재전송 횟수
const COOLDOWN_DURATION = 24 * 60 * 60 * 1000; // 재전송 제한 시간
const EXPIRATION_DURATION = 3 * 60 * 1000; // 인증코드 유효 시간 (3분)

export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 이메일 중복 확인
        const [emailConfirm] = await pool.query(confirmEmailSql, data.email);

        if (emailConfirm[0].isExistEmail) {
            conn.release();
            return -1; // 이메일 중복일 경우 -1 반환 또는 다른 적절한 값을 선택
        }

        const salt = crypto.randomBytes(128).toString('base64');
        const hashedPw = crypto
            .createHash(createdHash)
            .update(data.pw + salt)
            .digest(digest);


        // 사용자 데이터 삽입
        const result = await pool.query(insertUserSql, [
            data.name,
            data.nickname,
            data.email,
            hashedPw,
            data.phone,
            data.b_date,
            data.alarm, // 약관 동의 여부
            new Date(), // created
            'active', // status
            'local',// provider
            salt
        ]);
        conn.release();

        // 반환값을 사용자 닉네임으로 변경
        return "회원가입이 완료되었습니다.";
    } catch (err) {
        console.error(err); // 에러 출력
        return "서버에러"; // 또는 다른 적절한 값을 반환
    }
};

export const checkNicknameDuplication = async (nickname) => {
    try {
        const conn = await pool.getConnection();

        // 닉네임 중복 확인
        const [nicknameConfirm] = await conn.query(confirmNicknameSql, [nickname]);
        if( nicknameConfirm[0].isExistNickname) {
            conn.release()
            console.log("닉네임 중복")
            return -1;
        } else {
            conn.release()

            console.log("사용가능");
            return "사용 가능한 닉네임입니다.";
        }
    } catch (error) {
        console.error(error);
        return '서버 에러'; // 또는 다른 적절한 에러를 throw
    }
};


export const findemail = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 이름, 휴대폰 번호, 생년월일을 이용하여 사용자 조회
        const [userResult] = await pool.query(emailcheckSql, [data.name, data.phone, data.b_date]);

        conn.release();

        // 조회된 사용자가 없을 경우 null 반환
        if (userResult.length === 0) {
            console.log("사용자가 없습니다.")
            return null;
        }

        // 조회된 사용자 반환
        const user = userResult[0];
        return await user;

    } catch (err) {
        console.error(err); // 에러 출력
        return "사용자 정보를 가져오는 중에 오류가 발생했습니다.";
    }
};


export const logintry = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 데이터베이스에서 사용자 정보 조회
        const [user] = await pool.query(userCheckSql, [data.email]);

        // 결과가 없을 경우 에러 처리
        if (user.length === 0) {
            console.log("로그인 실패: 사용자를 찾을 수 없습니다.");
            return -1;
        }

        // 데이터베이스에서 가져온 솔트 값
        const savedSalt = user[0].salt;

        // 입력된 비밀번호를 동일한 솔트와 알고리즘으로 해싱
        const hashedInputPw = crypto
            .createHash(createdHash)
            .update(data.pw + savedSalt)
            .digest(digest);

        // 해싱된 비밀번호와 데이터베이스에 저장된 해시 값 비교
        if (hashedInputPw.substring(0, 100) === user[0].pw) {
            // 로그인 성공
            console.log("로그인이 완료되었습니다.", user[0].nickname);

            const userId = user[0].id;

            const userNickname = user[0].nickname;

            const accessToken = jwtUtil.sign(user[0]);
            //
            // // Refresh Token 발급
            const autologin = data.auto
            const refreshToken = jwtUtil.refresh(autologin);

            console.log("엑세스", accessToken);
            console.log("리프레시", refreshToken);

            // Refresh Token을 사용자 DB에 저장

            await pool.query('UPDATE user SET refresh = ? WHERE id = ?', [refreshToken, user[0].id]);


            // 로그인 성공 시 사용자 데이터와 accessToken과 refreshToken 반환
            return { userId, userNickname, accessToken, refreshToken };
            // return userNickname;


        } else {
            // 비밀번호 불일치 - 에러 처리
            console.log("로그인 실패: 비밀번호가 일치하지 않습니다.");
            return -1;
        }
    } catch (err) {
        console.error(err); // 에러 출력
        return -1;
    }
};

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


        const [checkUser] = await pool.query(checkUserSql, [data.name, data.email]);

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

        const [checkUser] = await pool.query(checkUserSql, [data.name, data.email]);

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

export const checkCode = async (data) => {
    try {
        // 이메일과 코드 확인
        const name = data.name
        const email = data.email;
        const enteredCode = data.code;

        const userId = await pool.query(getUserId, [name, email]);

        const sendedCode = emailVerificationMap.get(email);

        if (!sendedCode || sendedCode.code !== enteredCode) {
            return { status: -1, message: "인증 번호가 올바르지 않습니다." };
        }

        // 현재 시간과 인증 코드의 타임스탬프를 비교하여 유효 기간 확인
        const currentTime = Date.now();
        const codeTimestamp = sendedCode.timestamp;
        const expirationDuration = EXPIRATION_DURATION; // 인증 코드의 유효 기간

        if (currentTime - codeTimestamp > expirationDuration) {
            return { status: -1, message: "인증 번호의 유효 기간이 초과되었습니다." };
        }

        expireCodeAndCooldown(email); // 인증 관련 map 삭제
        return { status: 1, message: "인증 성공하였습니다.", userId: userId };
    } catch (error) {
        // 예외 처리
        console.error(error);
        throw error;
    }
};



export const updatePW = async (userId, data) => {
    try {


        userId = Number(userId);

        const conn = await pool.getConnection();

        try {
            const [storedpwinfo] = await pool.query(getStoredPw, [userId]);

            if (!storedpwinfo) {
                return {status: -1, message: "사용자 정보를 찾을 수 없습니다."};
            }

            // 데이터베이스에서 사용자 정보 조회
            const checkhashedPw = crypto
                .createHash(createdHash)
                .update(data.pw + storedpwinfo[0].salt)
                .digest(digest);


            if (checkhashedPw.substring(0, 100) === storedpwinfo[0].pw) {
                return {status: -1, message: "변경하려는 비밀번호가 기존 비밀번호와 동일합니다."}
            }

            const salt = crypto.randomBytes(128).toString('base64');
            const hashedPw = crypto
                .createHash(createdHash)
                .update(data.pw + salt)
                .digest(digest);

            const updatePW = await pool.query(updateUserPwSql, [hashedPw, new Date(), salt, userId]);

            console.log('비밀번호 변경이 완료되었습니다.');
            return {status: 1, message: "비밀번호 변경이 완료되었습니다."};
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error(err);
        return { status: -1, message: "서버 에러" }
    }
}

