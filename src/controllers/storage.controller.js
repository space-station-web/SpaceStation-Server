import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createStorageBook, deleteStorageBook,
         createStoragePost, getStoragePostType, deleteStoragePost, 
         getPostStorageByUserId,
         } from "../services/storage.service.js";

export const storageBookPost = async (req, res, next) => {
    console.log("Storage Book Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await createStorageBook(req.params, req.body, req.userID)));
};

export const storageBookDelete = async (req, res, next) => {
    console.log("Storage Book Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await deleteStorageBook(req.params, req.query, req.userID)));
};

export const storagePostPost = async (req, res, next) => {
    console.log("Storage Post Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await createStoragePost(req.params, req.body, req.userID)));
};

export const storagePostTypeGet = async (req, res, next) => {
    console.log("Storage Post Create!");
    console.log("query:", req.query);
    //console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await getStoragePostType(req.query, req.userID)));
};

export const storagePostDelete = async (req, res, next) => {
    console.log("Storage Post Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    // 토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await deleteStoragePost(req.params, req.query, req.userID)));
};

export const getMyPostStorage = async (req, res) => {
    //const userID = 20;
    //const { userID } = req;
    const { limit = 12, offset = 0, storageType } = req.query;
    //if(!userID) {
        //return res.status(401).send();
    //}

    // console.log('storageType:', storageType)
    if(!storageType) {
        return res.status(400).send(Object.assign({}, status.BAD_REQUEST, {message: '보관함 타입이 없습니다.'}));
    }
    //res.send(response(status.SUCCESS, await getPostStorageByUserId({limit:Number(limit), offset:Number(offset), userId:Number(userID), storageType:Number(storageType) })))
    res.send(response(status.SUCCESS, await getPostStorageByUserId({limit:Number(limit), offset:Number(offset), storageType:Number(storageType) })))

}
