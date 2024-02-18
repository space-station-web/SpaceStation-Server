import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {findUser} from "../services/mypage.service.js";

export const userFind = async (req, res, next) => {
    console.log("사용자 데이터를 요청하였습니다!");
    console.log("params:", req.params);

    res.send(response(status.SUCCESS, await findUser(req)));
}