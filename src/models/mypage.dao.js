import { pool } from "../../config/db.config.js";
import { response} from "../../config/response.js";
import { transporter } from "../../config/email.config.js";
import { status } from "../../config/response.status.js";

import {getUserInfo} from "./user.sql.js";
import dotenv from "dotenv";

dotenv.config();
export const userGet = async (userId) => {
    userId = Number(userId);

    const conn = await pool.getConnection();

    try {
        const [userinfo] = await pool.query(getUserInfo, [userId]);

        if (!userinfo) {
            return {status: -1, message: "사용자 정보를 찾을 수 없습니다."};
        }

        const user = userinfo[0];
        return {
            status: 1,
            message: "사용자 정보를 성공적으로 가져왔습니다.",
            data: {
                nickname: user.nickname,
                profileImage: user.image,
            },
        };
    } catch (err) {
        console.error(err);
        return { status: -1, message: "서버 에러" };
    } finally {
        conn.release();
    }
}