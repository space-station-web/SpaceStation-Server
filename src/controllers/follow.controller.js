import { status } from '../../config/response.status.js';
import followService from '../services/follow.service.js';
import { response } from '../../config/response.js';

export const followData = async (req, res) => {
    // 로그인 기능 완료 후 최종수정 필요
    const { type } = req.query;
    req.user = { id: 1} // 임의로 아이디 식별자 1로 설정
    const userId = req?.user?.id

    console.log('userId:', userId)
    if(!userId) {
        return res.status(401)
    }

    const data = await followService.data({userId, type: Number(type)})
    res.send(response(status.SUCCESS, data));
};


export const add = async (req, res) => {
    const { followId } = req.body;
    req.user = { id: 1}
    const userId = req?.user?.id
    
    if(!userId) {
        return res.status(401)
    }

    const data = await followService.add({userId, followId})
    res.send(response(status.SUCCESS, data));
};


export const remove = async (req, res) => {
    const { id, followId } = req.body;
    req.user = { id: 1}
    const userId = req?.user?.id
    
    if(!userId) {
        return res.status(401)
    }

    const data = await followService.remove({id, userId, followId})
    res.send(response(status.SUCCESS, data));
};


export const followListByUserId =  async (req, res) => {
    const { limit, offset } = req.query;
    req.user = { id: 1}
    const userId = req?.user?.id

    if(!userId) {
        return res.status(401)
    }

    const data = await followService.followListByUserId({userId, limit: Number(limit || 8), offset: Number(offset || 0)})
    res.send(response(status.SUCCESS, data));
};


