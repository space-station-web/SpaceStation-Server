import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bookDTO, bookContentsDTO, bookListDTO } from "../dtos/book.dto.js"
import { addBook, addBookContent, 
         getBookList, getBook, getContent, getContents,
         upBook, delBook, checkBookUser } from "../models/book.dao.js";
import { searchStorageBook } from "../models/storage.dao.js";
import { searchLikeBook } from "../models/like.dao.js";

export const createBook = async (body, file, userID) => {
    const createData = await addBook({
        'title': body.title,
        'intro': body.intro,
        'category': body.category,
        'thumbnail': (file != undefined? file.location : null),
        'user_id': userID,
    });
    console.log("create Book Result :" + createData.bookId);

    if(createData.bookId == -1){
        throw new BaseError(status.NOT_CREATED);
    }else{
        return readBook({'bookId': createData.bookId}, userID);
    }
}

export const createBookContent = async (body, files, userID) => {
    const createData = await addBookContent({
        'title': body.title,
        'text': body.text,
        'index': body.index,
        'book_id': body.bookId,
        'files':  files,
    });
    console.log("create BookContent Result :" + createData.bookContentId + ", " + createData.resultImgs);

    if(createData.bookContentId == -1){
        throw new BaseError(status.NOT_CREATED);
    }else{
        return readBookContent({'bookContentId': createData.bookContentId});
    }
}

export const readBookList = async (query) => {
    if (query == {}){
        throw new BaseError(status.WRONG_QUERY);
    }
    const bookData = await getBookList(query.category);

    if(bookData == -1){
        throw new BaseError(status.NOT_SEARCHED);
    }else{
        return bookListDTO(bookData);
    }
}

export const readBook = async (query, userID) => {
    if (query == {}){
        throw new BaseError(status.WRONG_QUERY);
    }
    console.log('book_id'+ query.bookId+" , "+ 'user_id'+ userID);
    const bookData = await getBook(query.bookId);
    const bookStorageData = await searchStorageBook({'book_id': query.bookId, 'user_id': userID});
    const bookLikeData = await searchLikeBook({'book_id': query.bookId, 'user_id': userID});
    const contentsData = await getContents(query.bookId);
    

    if(bookData == -1){
        throw new BaseError(status.NOT_SEARCHED);
    }else{
        return bookDTO(bookData, bookStorageData, bookLikeData, contentsData);
    }
}

export const readBookContent = async (params) => {
    console.log('bookContentId: '+ params.bookContentId);
    const contentsData = await getContent(params.bookContentId);
    

    if(contentsData == -1){
        throw new BaseError(status.NOT_SEARCHED);
    }else{
        return bookContentsDTO(contentsData);
    }
}

export const updateBook = async (params, body, userID) => {
    if (params.bookId == undefined) {
        throw new BaseError(status.WRONG_PATH);
    }
    const bookUser = await checkBookUser(params.bookId);
    if (bookUser[0][0].user_id != userID) {
        throw new BaseError(status.BOOK_UNAUTHORIZED);
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
        throw new BaseError(status.NOT_UPDATED);
    }else{
        return readBook({'bookId': params.bookId}, userID);;
    }
}

export const deleteBook = async (params, userID) => {
    if (params.bookId == undefined) {
        throw new BaseError(status.WRONG_PATH);
    }
    const bookUser = await checkBookUser(params.bookId);
    if (bookUser[0][0].user_id != userID) {
        throw new BaseError(status.BOOK_UNAUTHORIZED);
    }

    const deleteData = await delBook(params.bookId);
    console.log("delete Book Result :" + deleteData.deletedBook 
                + ", Content: " + deleteData.deletedBookContent 
                + ", Storage: " + deleteData.deletedBookStorage );

    if(deleteData == -1){
        throw new BaseError(status.NOT_DELETED);
    }else{
        return deleteData;
    }
}