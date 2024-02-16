import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinUser, checkNickName } from "../services/user.service.js";

export const userSignup = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

export const checkNickname = async (req, res, next) => {
    console.log("닉네임 중복확인을 요청하였습니다!");
    console.log("params.nickname:", req.params.nickname);
    res.send(response(status.SUCCESS, await checkNickName(req.params.nickname)))
};