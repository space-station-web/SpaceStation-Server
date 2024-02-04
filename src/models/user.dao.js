import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { confirmEmailSql, insertUserSql, emailcheckSql } from "./user.sql.js";

import crypto from 'crypto';

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
            .createHash('sha512')
            .update(data.pw + salt)
            .digest('hex');

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
            'local' // provider
        ]);

        conn.release();

        // 반환값을 사용자 닉네임으로 변경
        console.log("회원가입 완료되었습니다");
        return "회원가입이 완료되었습니다.";
    } catch (err) {
        console.error(err); // 에러 출력
        return "잘못된 매개변수입니다."; // 또는 다른 적절한 값을 반환
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
        console.log(user.email)
        return user;

    } catch (err) {
        console.error(err); // 에러 출력
        return "사용자 정보를 가져오는 중에 오류가 발생했습니다.";
    }
};

