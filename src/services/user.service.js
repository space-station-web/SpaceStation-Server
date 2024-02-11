import { logintry } from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import jwtUtil from "../../config/jwt-util.js";

export const loginUser = async (body) => {
    try {

        const loginUserData = await logintry({
            email: body.email,
            pw: body.pw,
            auto: body.auto
        });

        if (!loginUserData) {
            return -1;
        } else {
            const user = loginUserData.userNickname;
            const accessToken = loginUserData.accessToken;
            const refreshToken = loginUserData.refreshToken;

            return response(status.SUCCESS, { user, accessToken, refreshToken });
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};
