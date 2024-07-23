import { status } from '../../config/response.status.js';
import followService from '../services/follow.service.js';
import { response } from '../../config/response.js';

export const add = async (req, res) => {
    const { followId } = req.body;
    const userId = req.userID
    if(!userId) {
        return res.status(401).send()
    }
    const data = await followService.add({userId, followId})
    res.send(response(status.SUCCESS, data));
};


export const remove = async (req, res) => {
    const { id, followId } = req.body;
    const userId = req.userID
    
    if(!userId) {
        return res.status(401).send()
    }

    const data = await followService.remove({id, userId, followId})
    res.send(response(status.SUCCESS, data));
};


export const followListByUserId =  async (req, res) => {
    const { limit, offset } = req.query;
    const { user_id:targetUserId } = req.params;
    
    const userId = req.userID

    if(!userId) {
        return res.status(401).send()
    }

    const data = await followService.followListByUserId({userId: Number(targetUserId), limit: Number(limit || 8), offset: Number(offset || 0)})
    res.send(response(status.SUCCESS, data));
};


