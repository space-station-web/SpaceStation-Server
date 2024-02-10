import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { emailcheckSql } from "./user.sql.js";


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
        return await user;

    } catch (err) {
        console.error(err); // 에러 출력
        return "사용자 정보를 가져오는 중에 오류가 발생했습니다.";
    }
};

