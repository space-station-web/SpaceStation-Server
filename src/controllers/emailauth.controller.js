import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { codeSend, codeCheck, pwChange, recodeSend} from "../services/user.service.js";


export const codesend = async (req, res, next) => {
    console.log("인증번호 전송을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await codeSend(req.body)));
}

export const recode = async (req, res, next) => {
    console.log("인증번호 재전송을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await recodeSend(req, req.body)));
}

export const codecheck = async (req, res, next) => {
    console.log("인증번호 확인을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await codeCheck(req.body)));
}

export const pwchange = async (req, res, next) => {
    console.log("비밀번호 변경을 요청하였습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await pwChange(req, req.body)));
}