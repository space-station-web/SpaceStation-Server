import { status } from '../../config/response.status.js';
import mypageService from '../services/mypage.service.js';
import { response } from '../../config/response.js';

export const mypageData = async (req, res) => {
    // 로그인 기능 완료 후 최종수정 필요
    const { type } = req.query;
    req.user = { id: 1} // 임의로 아이디 식별자 1로 설정
    const userId = req?.user?.id

    console.log('userId:', userId)
    if(!userId) {
        return res.status(401)
    }

    const data = await mypageService.data({userId, type: Number(type)})
    res.send(response(status.SUCCESS, data));
};
