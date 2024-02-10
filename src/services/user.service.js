import {addUser, checkNicknameDuplication, logintry, findemail} from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";


export const joinUser = async (body) => {
    try {
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (body.pw !== body.pwcheck) {
            throw new BaseError(status.BAD_REQUEST);
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
            throw new BaseError(status.BAD_REQUEST);
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "회원가입에 성공했습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, null);
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};

export const checkNickName = async (nickname) => {
    try {
        if (!nickname) {
            throw new BaseError(status.FORBIDDEN, '닉네임을 입력해주세요.');
        }

        const isNicknameDuplicated = await checkNicknameDuplication(nickname);

        if (isNicknameDuplicated === -1) {
            throw new BaseError(status.BAD_REQUEST);
        } else {
            const successMessage = "닉네임 사용가능합니다"
            return response(status.SUCCESS, successMessage)
        }

    } catch (error) {
        console.error(error);
        return response(status.INTERNAL_SERVER_ERROR, '서버 에러');
    }
};


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
            return response(status.SUCCESS, { userNickname, userEmail, userProvider, message: successMessage });
        } else {
            // 사용자 정보가 없는 경우
            return response(status.BAD_REQUEST, "일치하는 사용자 정보를 찾을 수 없습니다.");
        }
    } catch (error) {
        throw error
    }
};