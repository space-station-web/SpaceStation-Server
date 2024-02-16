import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createLikeBook, deleteLikeBook,
         createLikePost, deleteLikePost } from "../services/like.service.js";

export const likeBookPost = async (req, res, next) => {
    console.log("like Book Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID); 

    res.send(response(status.SUCCESS, await createLikeBook(req.params, req.userID)));
};

export const likeBookDelete = async (req, res, next) => {
    console.log("like Book Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID); 

    res.send(response(status.SUCCESS, await deleteLikeBook(req.params, req.userID)));
};

export const likePostPost = async (req, res, next) => {
    console.log("like Post Create!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID); 

    res.send(response(status.SUCCESS, await createLikePost(req.params, req.userID)));
};

export const likePostDelete = async (req, res, next) => {
    console.log("like Post Delete!");
    console.log("params:", req.params);
    console.log("req.userID: ", req.userID); 

    res.send(response(status.SUCCESS, await deleteLikePost(req.params, req.userID)));
};