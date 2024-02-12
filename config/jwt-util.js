import jwt from 'jsonwebtoken';
import { pool } from "./db.config.js";

import dotenv from 'dotenv';

dotenv.config();


const conn = await pool.getConnection();
const TOKEN_PREFIX = 'Bearer '
const secretkey = process.env.secret

const tokenChecker = (req, res, next) => { // 로그인 검증 미들웨어
    const auth = req.headers.authorization;
    const token = auth?.split(TOKEN_PREFIX)[1];
    const {ok, id} = jwtUtil.verify(token)
    
    if(ok)
        req.userId = id;

    next()
}

const jwtUtil = {
    sign: (user) => {
        const payload = {
            id: user.id,
            role: user.email,
        };

        return jwt.sign(payload, secretkey, {
            algorithm: 'HS256',
            expiresIn: '3h',
        });
    },
    verify: (token) => {
        try {
            const decoded = jwt.verify(token, secretkey);
            return {
                ok: true,
                id: decoded.id,
                role: decoded.role,
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    },
    refresh: (data) => {
        const expiresIn = data ? '14d' : '1d';

        return jwt.sign({}, secretkey, {
            algorithm: 'HS256',
            expiresIn: expiresIn,
        });
    },
}

export default jwtUtil;
export { tokenChecker };
