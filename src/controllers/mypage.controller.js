import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {findUser, changeNickname, changeProfile} from "../services/mypage.service.js";

export const userFind = async (req, res, next) => {
    console.log("사용자 데이터를 요청하였습니다!");
    console.log("params:", req.params);

    res.send(response(status.SUCCESS, await findUser(req)));
}

export const changeNick = async (req, res, next) => {
    console.log("닉네임 변경을 요청하였습니다.");
    console.log("params:", req.params);
    console.log("body:", req.body)

    res.send(response(status.SUCCESS, await changeNickname(req, req.body)));
}

export const changeImg = async (req, res, next) => {
    console.log("프로필 사진 변경을 요청하였습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body)

    res.send(response(status.SUCCESS, await changeProfile(req, req.body)));
}