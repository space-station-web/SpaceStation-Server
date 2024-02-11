import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStorageBook, delStorageBook,
         addStoragePost, delStoragePost } from "../models/storage.dao.js";

export const createStorageBook = async (params, body) => {
    const createData = await addStorageBook({
        'book_id': Number(params.bookId),
        'user_id': body.userId
    });
    console.log("createStorageBook StorageBookId : " + createData.storageBookId);

    if(createData.storageBookId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return { "inStorage": true };
    }
}

export const deleteStorageBook = async (params, body) => {
    const deleteData = await delStorageBook({
        'book_id': Number(params.bookId),
        'user_id': body.userId
    });
    console.log("deleteStorageBook Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "inStorage": true };
    }else{
        return { "inStorage": false };
    }
}       

export const createStoragePost = async (params, body) => {
    const createData = await addStoragePost({
        'post_id': Number(params.postId),
        'user_id': body.userId
    });
    console.log("createStoragePost StoragePostId : " + createData.storagePostId);

    if(createData.storagePostId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return { "inStorage": true };
    }
}

export const deleteStoragePost = async (params, body) => {
    const deleteData = await delStoragePost({
        'post_id': Number(params.postId),
        'user_id': body.userId
    });
    console.log("deleteStoragePost Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "inStorage": true };
    }else{
        return { "inStorage": false };
    }
}  