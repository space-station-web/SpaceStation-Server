import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bookRepliesDTO, postRepliesDTO } from "../dtos/reply.dto.js";
import { addBookReply, searchBookReply, delBookReply,
         addPostReply, searchPostReply, delPostReply } from "../models/reply.dao.js";

export const createBookReply = async (body, userID) => {
    const createData = await addBookReply({
        'content': body.content,
        'user_id': userID,
        'book_id': body.bookId,
        'front_reply_id': (body.frontReplyId==undefined? null: body.frontReplyId),
    });
    console.log("bookReplyId : " + createData);

    if(createData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return { "book_reply_id": createData };
    }
}

export const readBookReply = async (query) => {
    const readData = await searchBookReply({
        'book_id': query.bookId
    });

    if(readData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return bookRepliesDTO(readData);
    }
}

export const deleteBookReply = async (query, userID) => {
    const deleteData = await delBookReply({
        'book_reply_id': query.replyId,
        'user_id': userID
    });
    console.log("deleteBookReply Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "deleted": false };
    }else{
        return { "deleted": true };
    }
}       

export const createPostReply = async (body, userID) => {
    const createData = await addPostReply({
        'content': body.content,
        'user_id': userID,
        'post_id': body.postId,
        'front_reply_id': (body.frontReplyId==undefined? null: body.frontReplyId),
    });
    console.log("postReplyId : " + createData);

    if(createData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return { "post_reply_id": createData };
    }
}

export const readPostReply = async (query) => {
    const readData = await searchPostReply({
        'post_id': query.postId
    });

    // const nickData = await searchNickname(readData.post_reply_id)

    console.log("readData: ", readData);
    if(readData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return postRepliesDTO(readData);
    }
}

export const deletePostReply = async (query, userID) => {
    const deleteData = await delPostReply({
        'post_reply_id': query.replyId,
        'user_id': userID
    });
    console.log("deleteBookReply Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "deleted": false };
    }else{
        return { "deleted": true };
    }
}  