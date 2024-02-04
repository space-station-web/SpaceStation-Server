import { addUser, findemail } from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";

export const joinUser = async (body) => {
    try {
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (body.pw !== body.pwcheck) {
            return response(status.BAD_REQUEST);
        }

        const joinUserData = await addUser({
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            pw: String(body.pw),
            pwcheck: String(body.pwcheck),
            b_date: body.b_date,
            phone: String(body.phone),
            alarm: body.alarm
        });

        if (joinUserData === -1) {
            return response(status.BAD_REQUEST);
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "회원가입에 성공했습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, {message: successMessage});
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};

export const checkemail = async (body) => {
    try{
        const userData = await findemail({
            name: body.name,
            phone: body.phone,
            b_date:body.b_date
        });

        if (userData) {
            const userEmail = userData.email
            const successMessage = `가입된 이메일은 ${userEmail}입니다.`;
            return response(status.SUCCESS, { message: successMessage });
        } else {
            // 사용자 정보가 없는 경우
            return response(status.BAD_REQUEST, "일치하는 사용자 정보를 찾을 수 없습니다.");
        }
    } catch (error) {
        throw error
    }
};
