import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStorageBook, delStorageBook,
         addStoragePost, searchStoragePostType, delStoragePost, 
         getPostStorageListByUserId } from "../models/storage.dao.js";

export const createStorageBook = async (params, body, userID) => {
    const createData = await addStorageBook({
        'book_id': params.bookId,
        'storage_type_id': body.typeId,
        'user_id': userID
    });
    console.log("createStorageBook StorageBookId : " + createData.storageBookId);

    if(createData.storageBookId == -1){
        throw new BaseError(status.NOT_CREATED);
    }else{
        return { "storage": true };
    }
}

export const deleteStorageBook = async (params, query, userID) => {
    const deleteData = await delStorageBook({
        'book_id': params.bookId,
        'storage_type_id': query.typeId,
        'user_id': userID
    });
    console.log("deleteStorageBook Result : " + deleteData);

    if(deleteData == 0){
        throw new BaseError(status.NOT_DELETED);
    }else{
        return { "storage": false };
    }
}       

export const getStoragePostType = async (query, userID) => {
    const getData = await searchStoragePostType({
        'post_id': query.postId,
        'user_id': userID
    });
    const typeList = []
    getData[0].forEach( e => {
        typeList.push(e.storage_type_id);
    });

    if(getData == -1){
        throw new BaseError(status.NOT_SEARCHED);
    }else{
        return { "typeList" : typeList };
    }
}

export const createStoragePost = async (params, body, userID) => {
    const createData = await addStoragePost({
        'post_id': params.postId,
        'storage_type_id': body.typeId,
        'user_id': userID
    });
    console.log("createStoragePost StoragePostId : " + createData.storagePostId);

    if(createData.storagePostId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return { "storage": true };
    }
}

export const deleteStoragePost = async (params, query, userID) => {
    const deleteData = await delStoragePost({
        'post_id': params.postId,
        'storage_type_id': query.typeId,
        'user_id': userID
    });
    console.log("deleteStoragePost Result : " + deleteData);

    if(deleteData == 0){
        //throw new BaseError(status.EMAIL_ALREADY_EXIST);
        return { "storage": true };
    }else{
        return { "storage": false };
    }
}  

export const getPostStorageByUserId = async ({limit = 12, offset = 0, storageType}) => {
    const result = await getPostStorageListByUserId({limit, offset, storageType});
    return result;
}