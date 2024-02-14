import {sendCode, resendCode, checkCode, updatePW} from "../models/user.dao.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";

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

export const codeCheck = async (req, body) => {
    try {
        const verify = await checkCode(req,{
            name: body.name,
            email: body.email,
            code: body.code,
        });

        if (verify.status === -1) {
            console.log(`인증 실패 : ${verify.message}`)
            return response(status.BAD_REQUEST);
        } else {
            console.log(verify.message); // 성공 메시지 추가
            return response(status.SUCCESS);
        }
    } catch (error) {
        // 예외 처리
        throw error;
    }
};

export const pwChange = async (req, body) => {
    try {
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (body.pw !== body.pwcheck) {
            return response(status.BAD_REQUEST);
        }

        const changePW = await updatePW(req,{
            pw: String(body.pw),
            pwcheck: String(body.pwcheck),
        });

        if (changePW === -1) {
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