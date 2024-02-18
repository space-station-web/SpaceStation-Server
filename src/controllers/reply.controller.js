import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createBookReply, readBookReply, deleteBookReply,
         createPostReply, readPostReply, deletePostReply } from "../services/reply.service.js";

export const bookReplyPost = async (req, res, next) => {
    console.log("book reply Create!");
    console.log("req.userID: ", req.userID); 
    console.log("req.body: ", req.body);

    res.send(response(status.SUCCESS, await createBookReply(req.body, req.userID)));
};

export const bookReplyGet = async (req, res, next) => {
    console.log("book reply Get!");
    console.log("req.query: ", req.query);

    res.send(response(status.SUCCESS, await readBookReply(req.query)));
};

export const bookReplyDelete = async (req, res, next) => {
    console.log("book reply Delete!");
    console.log("req.userID: ", req.userID); 
    console.log("req.query: ", req.query);

    res.send(response(status.SUCCESS, await deleteBookReply(req.query, req.userID)));
};

export const postReplyPost = async (req, res, next) => {
    console.log("post reply Create!");
    console.log("req.userID: ", req.userID);
    console.log("req.body: ", req.body); 

    res.send(response(status.SUCCESS, await createPostReply(req.body, req.userID)));
};

export const postReplyGet = async (req, res, next) => {
    console.log("post reply Get!");
    console.log("req.query: ", req.query); 

    res.send(response(status.SUCCESS, await readPostReply(req.query)));
};

export const postReplyDelete = async (req, res, next) => {
    console.log("post reply Delete!");
    console.log("req.userID: ", req.userID); 
    console.log("req.query: ", req.query);

    res.send(response(status.SUCCESS, await deletePostReply(req.query, req.userID)));
};