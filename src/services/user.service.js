import { logintry } from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";

export const loginUser = async (body) => {
    try {

        const loginUserData = await logintry({
            email: body.email,
            pw: body.pw,
        });

        if (!loginUserData) {
            return -1;
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = `로그인에 성공했습니다. 닉네임: ${loginUserData.nickname}`;
            return response(status.SUCCESS, successMessage); // 성공 메시지 추가
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};
