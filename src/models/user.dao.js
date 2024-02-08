import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { userCheckSql } from "./user.sql.js";

import crypto from 'crypto';

export const logintry = async (data) => {
    try {
        const conn = await pool.getConnection();

        const salt = crypto.randomBytes(128).toString('base64');
        const hashedPw = crypto
            .createHash('sha512')
            .update(data.pw + salt)
            .digest('hex');

        // 사용자 데이터 조회
        const [user] = await pool.query(userCheckSql, [data.email, hashedPw]);

        conn.release();

        // 결과가 없을 경우 에러 처리
        if (user.length === 0) {
            console.log("로그인 실패")
            return -1;
        }

        // 반환값을 사용자 닉네임으로 변경
        const userNickname = user[0].nickname;
        console.log("로그인이 완료되었습니다.", userNickname);
        return userNickname;
    } catch (err) {
        console.error(err); // 에러 출력
        return -1;
    }
};
