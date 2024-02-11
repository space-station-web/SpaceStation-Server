import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bookDTO } from "../dtos/book.dto.js"
import { addBook, getBook, upBook, delBook, getContents, checkBookUser } from "../models/book.dao.js";
import { searchStorageBook } from "../models/storage.dao.js";

export const createBook = async (body) => {
    const createData = await addBook({
        'title': body.title,
        'intro': body.intro,
        'category': body.category,
        'user_id': body.userId,
        'contents':  body.bookContents,
    });
    console.log("create Book Result :" + createData.bookId + ", " + createData.resultContents);

    if(createData.bookId == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return bookDTO(
            await getBook(createData.bookId), 
            await searchStorageBook({'book_id': createData.bookId, 'user_id': body.userId}), 
            await getContents(createData.bookId)
        );
    }
}

export const readBook = async (params) => {
    console.log('book_id'+ Number(params.bookId)+" , "+
    'user_id'+ Number(params.userId));
    const bookData = await getBook(params.bookId);
    const bookStorageData = await searchStorageBook({
        'book_id': Number(params.bookId),
        'user_id': Number(params.userId)
    });
    const contentsData = await getContents(params.bookId);

    if(bookData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return bookDTO(bookData, bookStorageData, contentsData);
    }
}

export const updateBook = async (params, body) => {
    const bookUser = await checkBookUser(params.bookId);
    if (bookUser[0][0].user_id != body.userId) {
        return "user and the author are different.";
    }

    const updateData = await upBook({
        'title': body.title,
        'intro': body.intro,
        'category': body.category,
        'user_id': body.userId,
        'contents': body.bookContents,
        'id': params.bookId
    });
    console.log("update Book Result :" + updateData.resultBook +", "+updateData.resultContents);

    if(updateData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return bookDTO(
            await getBook(params.bookId), 
            await searchStorageBook({'book_id': Number(params.bookId), 'user_id': body.userId}), 
            await getContents(params.bookId)
        );
    }
}

export const deleteBook = async (params, body) => {
    const bookUser = await checkBookUser(params.bookId);
    if (bookUser[0][0].user_id != body.userId) {
        return "user and the author are different.";
    }

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