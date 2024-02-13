import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createStorageBook, deleteStorageBook,
         createStoragePost, deleteStoragePost, getPostStorageByUserId } from "../services/storage.service.js";

export const storageBookPost = async (req, res, next) => {
    console.log("Storage Book Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await createStorageBook(req.params, req.userID)));
};

export const storageBookDelete = async (req, res, next) => {
    console.log("Storage Book Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await deleteStorageBook(req.params, req.userID)));
};

export const storagePostPost = async (req, res, next) => {
    console.log("Storage Post Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await createStoragePost(req.params, req.userID)));
};

export const storagePostDelete = async (req, res, next) => {
    console.log("Storage Post Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID);    //토큰으로 받은 유저 아이디

    res.send(response(status.SUCCESS, await deleteStoragePost(req.params, req.userID)));
};

export const getMyPostStorage = async (req, res) => {
    const { userId } = req;
    const { limit = 12, offset = 0 } = req.query;
    if(!userId) {
        return res.status(401).send();
    }
    res.send(response(status.SUCCESS, await getPostStorageByUserId({limit:Number(limit), offset:Number(offset), userId:Number(userId) })))
}