import jwt from 'jsonwebtoken';
import { pool } from "./db.config.js";

import dotenv from 'dotenv';

dotenv.config();


const conn = await pool.getConnection();

const secretkey = process.env.secret

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
