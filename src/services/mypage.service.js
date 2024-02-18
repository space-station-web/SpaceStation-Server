import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import {userGet} from "../models/mypage.dao.js";

export const findUser = async (req) => {
    try {
        const userId = req.params.userId;
        console.log(userId)

        if (!userId) {
            // userId가 정상적으로 설정되지 않은 경우에 대한 처리
            console.error("userId가 설정되지 않았습니다.");
            return response(status.BAD_REQUEST);
        }
        const getUser = await userGet(userId);


        if (getUser.status === -1) {
            console.log(`사용자 데이터 가져오기 실패 : ${getUser.message}`)
            return response(status.BAD_REQUEST);

        }

        const {nickname, image} = getUser.data;
        // 회원가입 성공 시 응답 데이터 구성 (사용자 정보 반환하지 않음)
        console.log(nickname);
        console.log(image)// 성공 메시지 추가
        return response(status.SUCCESS, {nickname, image});

    } catch (error) {
        // 예외 처리
        throw error;
    }
};