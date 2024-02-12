import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import jwtUtil from "../../config/jwt-util.js";
import { loginUser } from "../services/user.service.js";

export const userLogin = async (req, res, next) => {
    console.log("로그인을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await loginUser(req.body)));
}