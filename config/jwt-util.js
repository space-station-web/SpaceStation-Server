import jwt from 'jsonwebtoken';
import { pool } from "./db.config.js";
import {getRefresh, userCheckSql} from "../src/models/user.sql.js";

import dotenv from 'dotenv';
import {response} from "./response.js";
import {status} from "./response.status.js";

dotenv.config();


const TOKEN_PREFIX = 'Bearer '
const secretkey = process.env.secret


const jwtUtil = {

    sign: (user) => {
        
        const payload = {
            id: user.id,
            mail: user.email,
        };

        
        return jwt.sign(payload, secretkey, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
    },
    verify: (token) => {
        try {
            const decoded = jwt.verify(token, secretkey);
            return {
                ok: true,
                id: decoded.id,
                mail: decoded.mail
            };
        } catch (err) {
            return {
                ok: false,
                message: "jwt expired",
            };
        }
    },
    refresh: (data) => {
        const expiresIn = data ? '14d' : '1d';
        //
        return jwt.sign({}, secretkey, {
            algorithm: 'HS256',
            expiresIn: expiresIn,
        });
    },

    refreshverify: async (retoken, id) => {
        try {
            const conn = await pool.getConnection();
            const [reToken] = await pool.query(getRefresh, [id]);

            if (reToken == 0){
                conn.release()
                return -1
            }
            const store_reToken = reToken[0].refresh;

            if (retoken === store_reToken) {
                try {
                    jwt.verify(retoken, secretkey);
                    conn.release()
                    return true;
                } catch (err) {
                    conn.release()
                    return false
                }
            } else {
                conn.release()
                return false
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },
}
export const tokenChecker = async (req, res, next) => {
    try{
        if (req.headers["authorization"] && req.headers["refresh"]) {
            const access = req.headers["authorization"].split(TOKEN_PREFIX)[1];
            const refresh = req.headers["refresh"];

            const accessResult = jwtUtil.verify(access);
            if (!accessResult.ok) { //결과가 없으면 권한 없음
                return res.status(status.UNAUTHORIZED.status).send(response(status.UNAUTHORIZED));
            }

            if (accessResult.ok === false && accessResult.message === "jwt expired") { // access 만료 + refresh 만료 -> 재로그인
                const refreshResult = await jwtUtil.refreshverify(refresh, accessResult.id); //access에서 유저id 가져와서 refresh 검증

                if (refreshResult === false) {
                    return res.redirect('/login');
                } else { // access 만료, refresh 만료X -> access token 재발급
                    const newAccessToken = jwtUtil.sign(accessResult);
                    res.send(response(status.SUCCESS, {newAccessToken, refresh}));  // 이것도 반환 두 번에 걸릴 것 같은데.. 어떻게 해야할지 모르겠네요..
                    req.userID = accessResult.id
                    next();
                }
            } else { // access 만료X 그냥 진행
                //res.send(response(status.SUCCESS)) // 반환을 두 번 하면 안된다고 하네요..
                req.userID = accessResult.id
                next();
            }
        } else {
            return res.send(response(status.BAD_REQUEST));
        }
    } catch {
        return res.send(response(status.BAD_REQUEST));
    }
}

export default jwtUtil;
