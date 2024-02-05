import { status } from '../../config/response.status.js';
import mypageService from '../services/mypage.service.js';
import { CheckFlag } from '../services/temp.service.js';
import { response } from '../../config/response.js';

export const mypageData = async (req, res) => {
    const { type } = req.query;
    req.user = { id: 1}
    const userId = req?.user?.id

    console.log('userId:', userId)
    if(!userId) {
        return res.status(401)
    }

    const data = await mypageService.data({userId, type: Number(type)})
    res.send(response(status.SUCCESS, data));
};

export const mypageFollow =  async (req, res) => {
    const { limit, offset } = req.query;
    req.user = { id: 1}
    const userId = req?.user?.id

    if(!userId) {
        return res.status(401)
    }

    const data = await mypageService.follow({userId, limit: Number(limit || 8), offset: Number(offset || 0)})
    res.send(response(status.SUCCESS, data));
};