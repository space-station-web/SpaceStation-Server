import { status } from '../../config/response.status.js';
import neighborpageService from '../services/neighborpage.service.js';
import { CheckFlag } from '../services/temp.service.js';
import { response } from '../../config/response.js';

export const neighborpageData = async (req, res) => {
    const { type } = req.query;
    req.user = { id: 1}
    const userId = req?.user?.id

    console.log('userId:', userId)
    if(!userId) {
        return res.status(401)
    }

    const data = await neighborpageService.data({userId, type: Number(type)})
    res.send(response(status.SUCCESS, data));
};


export const add = async (req, res) => {
    const { followId } = req.body;
    req.user = { id: 1}
    const userId = req?.user?.id
    
    if(!userId) {
        return res.status(401)
    }

    console.log('userId:', userId)
    console.log('followId:', followId)

    const data = await neighborpageService.add({userId, followId})
    res.send(response(status.SUCCESS, data));
};


export const remove = async (req, res) => {
    const { id, followId } = req.body;
    req.user = { id: 1}
    const userId = req?.user?.id
    
    if(!userId) {
        return res.status(401)
    }

    console.log('id:', id)
    console.log('userId:', userId)
    console.log('followId:', followId)

    const data = await neighborpageService.remove({id, userId, followId})
    res.send(response(status.SUCCESS, data));
};



