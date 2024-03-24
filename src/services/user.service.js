import {addUser, checkNicknameDuplication, logintry, findemail, sendCode, resendCode, checkCode, updatePW} from "../models/user.dao.js";


import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import jwtUtil from "../../config/jwt-util.js";



export const codeSend = async (body) => {
    try {

        const findUserData = await sendCode({
            name: body.name,
            email: body.email,
        });

        if (findUserData === -1) {
            return response(status.BAD_REQUEST);
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "인증번호가 메일로 전송되었습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, {message: successMessage});
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};

export const recodeSend = async (body) => {
    try {

        const findUserData = await resendCode({
            name: body.name,
            email: body.email,
        });

        if (findUserData === -1) {
            return response(status.BAD_REQUEST);
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "인증번호가 메일로 전송되었습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, {message: successMessage});
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};

export const codeCheck = async (body) => {
    try {
        const verify = await checkCode({
            name: body.name,
            email: body.email,
            code: body.code,
        });

        if (verify.status === -1) {
            console.log(`인증 실패 : ${verify.message}`)
            return response(status.BAD_REQUEST);
        } else {
            console.log(verify.message); // 성공 메시지 추가
            return response(status.SUCCESS, {userId: verify.userId});
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};


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
            console.log("이메일 중복");
            return response(status.BAD_REQUEST);
        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            console.log("회원가입 성공")
            const successMessage = "회원가입에 성공했습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, successMessage);
        }
    } catch (error) {
        // 예외 처리
        return response(status.BAD_REQUEST);
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
            const successMessage = `${userNickname}님이 가입한 이메일은 ${userEmail}입니다.`;
            console.log(successMessage)
            console.log(response(status.SUCCESS, { userNickname, userEmail, userProvider}));
            return response(status.SUCCESS, { userNickname, userEmail, userProvider});
        } else {
            // 사용자 정보가 없는 경우
            console.log(status.NOT_USER);
            return response(status.NOT_USER);
        }
    } catch (error) {
        throw error
    }
};


export const pwChange = async (req, body) => {
    try {

        const userId = req.params.userId;
        console.log(userId)


        if (!userId) {
            // userId가 정상적으로 설정되지 않은 경우에 대한 처리
            console.error("userId가 설정되지 않았습니다.");
            return response(status.BAD_REQUEST);
        }

        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (body.pw !== body.pwcheck) {
            console.log('비밀번호 변경 실패 : 변경 비밀번호와, 변경 비밀번호 확인이 다릅니다.')
            return response(status.BAD_REQUEST);
        }

        const changePW = await updatePW(userId,{
            pw: String(body.pw),
            pwcheck: String(body.pwcheck),
        });

        if (changePW.status === -1) {
            console.log(`비밀번호 변경 실패 : ${changePW.message}`)
            return response(status.BAD_REQUEST);

        } else {
            // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
            const successMessage = "비밀번호가 변경되었습니다."; // 성공 메시지 추가
            return response(status.SUCCESS, {message: successMessage});
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }

};
export const loginUser = async (body) => {
    try {

        const loginUserData = await logintry({
            email: body.email,
            pw: body.pw,
            auto: body.auto
        });

        if (loginUserData === -1) {
            console.log(response(status.BAD_REQUEST))
            return response(status.BAD_REQUEST);
        } else {
            const userid = loginUserData.userId;
            const usernick = loginUserData.userNickname;
            const accessToken = loginUserData.accessToken;
            const refreshToken = loginUserData.refreshToken;

            console.log(userid, usernick, accessToken, refreshToken)
            return response(status.SUCCESS, { userid, usernick, accessToken, refreshToken });
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};