import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bookDTO, bookContentsDTO } from "../dtos/book.dto.js"
import { addBook, addBookContent, getBook, getContent, getContents,
         upBook, delBook, checkBookUser } from "../models/book.dao.js";
import { searchStorageBook } from "../models/storage.dao.js";
import { searchLikeBook } from "../models/like.dao.js";

export const createBook = async (body, userID) => {
    const createData = await addBook({
        'title': body.title,
        'intro': body.intro,
        'category': body.category,
        'user_id': userID,
    });
    console.log("create Book Result :" + createData.bookId);

    if(createData.bookId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return readBook({'bookId': createData.bookId}, userID);
    }
}

export const createBookContent = async (params, body, files, userID) => {
    const createData = await addBookContent({
        'title': body.title,
        'text': body.text,
        'index': body.index,
        'book_id': params.bookId,
        'files':  files,
    });
    console.log("create Book Result :" + createData.bookContentId + ", " + createData.resultImgs);

    if(createData.bookContentId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return readBookContent({'bookContentId': createData.bookContentId});
    }
}

export const readBook = async (params, userID) => {
    console.log('book_id'+ params.bookId+" , "+ 'user_id'+ userID);
    const bookData = await getBook(params.bookId);
    const bookStorageData = await searchStorageBook({'book_id': params.bookId, 'user_id': userID});
    const bookLikeData = await searchLikeBook({'book_id': params.bookId, 'user_id': userID});
    const contentsData = await getContents(params.bookId);
    

    if(bookData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return bookDTO(bookData, bookStorageData, bookLikeData, contentsData);
    }
}

export const readBookContent = async (params) => {
    console.log('bookContentId'+ params.bookContentId);
    const contentsData = await getContent(params.bookContentId);
    

    if(contentsData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return bookContentsDTO(contentsData);
    }
}

export const updateBook = async (params, body, userID) => {
    const bookUser = await checkBookUser(params.bookId);
    if (bookUser[0][0].user_id != userID) {
        return "user and the author are different.";
    }

    const updateData = await upBook({
        'title': body.title,
        'intro': body.intro,
        'category': body.category,
        'user_id': userID,
        'contents': body.contents,
        'id': params.bookId
    });
    console.log("update Book Result :" + updateData.resultBook +", "+updateData.resultContents);

    if(updateData == -1){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        return readBook({'bookId': params.bookId}, userID);;
    }
}

export const deleteBook = async (params, userID) => {
    // const bookUser = await checkBookUser(params.bookId);
    // if (bookUser[0][0].user_id != userID) {
    //     return "user and the author are different.";
    // }

    const deleteData = await delBook(params.bookId);
    console.log("delete Book Result :" + deleteData.deletedBook 
                + ", Content: " + deleteData.deletedBookContent 
                + ", Storage: " + deleteData.deletedBookStorage );

    if(deleteData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return deleteData;
    }
}