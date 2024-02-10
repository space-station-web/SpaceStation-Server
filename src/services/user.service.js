import { findemail } from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";

export const checkemail = async (body) => {
    try{
        const userData = await findemail({
            name: body.name,
            phone: String(body.phone),
            b_date:body.b_date
        });
        if (userData) {
            const userNickname = userData.nickname
            const userEmail = userData.email
            const userProvider = userData.provider
            const successMessage = `${userNickname}이 가입한 이메일은 ${userEmail}입니다.`;
            console.log(successMessage)
            return response(status.SUCCESS, { userNickname, userEmail, userProvider});
        } else {
            // 사용자 정보가 없는 경우
            return response(status.BAD_REQUEST, "일치하는 사용자 정보를 찾을 수 없습니다.");
        }
    } catch (error) {
        throw error
    }
};
