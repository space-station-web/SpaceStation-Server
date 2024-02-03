import { addUser } from "../models/user.dao.js";
import { status } from "../../config/response.status.js";

export const joinUser = async (body) => {
    try {
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (body.pw !== body.pwcheck) {
            throw new Error("비밀번호가 일치하지 않습니다.");
        }

        const joinUserData = await addUser({
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            pw: body.pw,
            pwcheck: body.pwcheck,
            b_date: body.b_date,
            phone: body.phone,
            alarm: body.alarm
        });

        if (joinUserData === -1) {
            throw new Error("이미 존재하는 이메일입니다.");
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "회원가입에 성공했습니다."; // 성공 메시지 추가
            return { success: true, message: successMessage };
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};
