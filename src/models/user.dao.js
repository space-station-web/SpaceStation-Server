import { pool } from "../../config/db.config.js";
import { userCheckSql } from "./user.sql.js";
import jwtUtil from "../../config/jwt-util.js";
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const createdHash = process.env.createdHash;
const digest = process.env.digest;

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

            const accessToken = jwtUtil.sign(user[0]);

            // Refresh Token 발급
            const refreshToken = jwtUtil.refresh();

            // Refresh Token을 사용자 DB에 저장
            await pool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user[0].id]);


            return user[0].nickname;
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
