import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { confirmEmail, insertUserSql } from "./user.sql.js";

import crypto from 'crypto';

export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 이메일 중복 확인
        const [emailConfirm] = await pool.query(confirmEmail, data.email);

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
        return "회원가입이 완료되었습니다.";
    } catch (err) {
        console.error(err); // 에러 출력
        return "잘못된 매개변수입니다."; // 또는 다른 적절한 값을 반환
    }
};
