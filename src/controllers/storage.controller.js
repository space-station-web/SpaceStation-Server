import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createStorageBook, deleteStorageBook,
         createStoragePost, deleteStoragePost } from "../services/storage.service.js";

export const storageBookPost = async (req, res, next) => {
    console.log("Storage Book Create!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await createStorageBook(req.params, req.body)));
};

export const storageBookDelete = async (req, res, next) => {
    console.log("Storage Book Delete!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await deleteStorageBook(req.params, req.body)));
};

export const storagePostPost = async (req, res, next) => {
    console.log("Storage Post Create!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await createStoragePost(req.params, req.body)));
};

export const storagePostDelete = async (req, res, next) => {
    console.log("Storage Post Delete!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await deleteStoragePost(req.params, req.body)));
};