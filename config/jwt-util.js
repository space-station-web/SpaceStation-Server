import jwt from 'jsonwebtoken';
import { pool } from "./db.config.js";

import dotenv from 'dotenv';

dotenv.config();


const conn = await pool.getConnection();

const secretkey = process.env["jwtsecret "]

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
    refresh: () => {
        return jwt.sign({}, secretkey, {
            algorithm: 'HS256',
            expiresIn: '14d',
        });
    },

    refreshVerify: async (token, userId) => {
        const result = await pool.query('SELECT refresh_token FROM user_tokens WHERE user_id = ?', [userId]);
        const storedToken = result.length > 0 ? result[0].refresh_token : null;

        if (token === storedToken) {
          try {
            jwt.verify(token, secretkey);
            return true;
          } catch (err) {
            return false;
          }
        } else {
          return false;
        }

    },
};

export default jwtUtil;
