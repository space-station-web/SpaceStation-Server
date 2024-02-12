import { pool, transporter } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";

import { emailcheckSql, userCheckSql,  confirmNicknameSql, insertUserSql } from "./user.sql.js";
import jwtUtil from "../../config/jwt-util.js";



import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const createdHash = process.env.createdHash;
const digest = process.env.digest;

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
            return { userNickname, accessToken, refreshToken };
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