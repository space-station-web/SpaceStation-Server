import { pool, transporter } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { confirmEmailSql, insertUserSql, usercheckSql } from "./user.sql.js";

import crypto from 'crypto';

export const sendCode = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 이메일 중복 확인
        const [userCheck] = await pool.query(usercheckSql, data.name, data.email);

        if (userCheck[0].isExistUser) {
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

