// import { pool } from "../../config/db.config.js";
// import { status } from "../../config/response.status.js";
// import { userCheckSql } from "./user.sql.js";
//
// import crypto from 'crypto';
//
// export const logintry = async (data) => {
//     try {
//         const conn = await pool.getConnection();
//
//         const salt = crypto.randomBytes(128).toString('base64');
//         const hashedPw = crypto
//             .createHash('sha512')
//             .update(data.pw + salt)
//             .digest('hex');
//
//         // 사용자 데이터 조회
//         const [user] = await pool.query(userCheckSql, [data.email, hashedPw]);
//
//         conn.release();
//
//         // 결과가 없을 경우 에러 처리
//         if (user.length === 0) {
//             console.log("로그인 실패")
//             return -1;
//         }
//
//         // 반환값을 사용자 닉네임으로 변경
//         const userNickname = user[0].nickname;
//         console.log("로그인이 완료되었습니다.", userNickname);
//         return userNickname;
//     } catch (err) {
//         console.error(err); // 에러 출력
//         return -1;
//     }
// };


import { pool } from "../../config/db.config.js";
import { userCheckSql } from "./user.sql.js";
import crypto from 'crypto';

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
            .createHash('sha512')
            .update(data.pw + savedSalt)
            .digest('hex');

        // 해싱된 비밀번호와 데이터베이스에 저장된 해시 값 비교
        if (hashedInputPw.substring(0, 100) === user[0].pw) {
            // 로그인 성공
            console.log("로그인이 완료되었습니다.", user[0].nickname);
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
