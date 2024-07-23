import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addLikeBook, delLikeBook,
         addLikePost, delLikePost } from "../models/like.dao.js";

export const createLikeBook = async (params, userID) => {
    const createData = await addLikeBook({
        'book_id': Number(params.bookId),
        'user_id': userID
    });
    console.log("createLikeBook LikeBookId : " + createData.likeBookId);

    if(createData.likeBookId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return { "like": true };
    }
}

export const deleteLikeBook = async (params, userID) => {
    const deleteData = await delLikeBook({
        'book_id': Number(params.bookId),
        'user_id': userID
    });
    console.log("deleteLikeBook Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "like": true };
    }else{
        return { "like": false };
    }
}       

export const createLikePost = async (params, userID) => {
    const createData = await addLikePost({
        'post_id': Number(params.postId),
        'user_id': userID
    });
    console.log("createLikePost LikePostId : " + createData.likePostId);

    if(createData.likePostId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return { "like": true };
    }
}

export const deleteLikePost = async (params, userID) => {
    const deleteData = await delLikePost({
        'post_id': Number(params.postId),
        'user_id': userID
    });
    console.log("deleteStoragePost Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "like": true };
    }else{
        return { "like": false };
    }
}  