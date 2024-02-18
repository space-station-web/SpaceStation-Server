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

export const nicknameChange = async (userId, data) => {
    userId = Number(userId);
    const newNick = data.nickname

    const conn = await pool.getConnection();

    try {
        const [usernick] = await pool.query(changeUserNick, [newNick, new Date(), userId]);

        if (updateResult.affectedRows === 0) {
            // 쿼리가 영향을 미치지 않았다면 사용자 정보를 찾을 수 없는 것입니다.
            return { status: -1, message: "사용자 정보를 찾을 수 없습니다." };
        }

        const [updatedUserInfo] = await pool.query(getUserInfo, [userId]);

        if (!updatedUserInfo || updatedUserInfo.length === 0) {
            return { status: -1, message: "업데이트된 사용자 정보를 찾을 수 없습니다." };
        }

        const updatedUser = updatedUserInfo[0];

        return {
            status: 1,
            message: "닉네임을 성공적으로 변경하였습니다.",
            data: {
                nickname: updatedUser.nickname,
            },
        };
    } catch (err) {
        console.error(err);
        return { status: -1, message: "서버 에러" };
    } finally {
        conn.release();
    }
}

export const imageChange = async (userId, data) => {
    userId = Number(userId);
    const newImg = data.image

    const conn = await pool.getConnection();

    try {
        const [userimg] = await pool.query(changeUserImg, [newImg, new Date(), userId]);

        if (updateResult.affectedRows === 0) {
            // 쿼리가 영향을 미치지 않았다면 사용자 정보를 찾을 수 없는 것입니다.
            return { status: -1, message: "사용자 정보를 찾을 수 없습니다." };
        }

        const [updatedUserInfo] = await pool.query(getUserInfo, [userId]);

        if (!updatedUserInfo || updatedUserInfo.length === 0) {
            return { status: -1, message: "업데이트된 사용자 정보를 찾을 수 없습니다." };
        }

        const updatedUser = updatedUserInfo[0];

        return {
            status: 1,
            message: "프로필 이미지를 성공적으로 변경하였습니다.",
            data: {
                image: updatedUser.image,
            },
        };
    } catch (err) {
        console.error(err);
        return { status: -1, message: "서버 에러" };
    } finally {
        conn.release();
    }
}