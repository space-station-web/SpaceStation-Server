import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bookDTO, bookContentsDTO } from "../dtos/book.dto.js"
import { addBook, getBook, upBook, delBook, getContents } from "../models/book.dao.js";

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
        return bookDTO(await getBook(createData.bookId), await getContents(createData.bookId));
    }
}

export const readBook = async (params) => {
    const bookData = await getBook(params.bookId);
    const contentsData = await getContents(params.bookId);
    console.log("read Book Result :" + bookData);

    if(bookData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return bookDTO(bookData, contentsData);
    }
}

export const updateBook = async (params, body) => {
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
        return bookDTO(await getBook(params.bookId), await getContents(params.bookId));
    }
}

export const deleteBook = async (params) => {
    const deleteData = await delBook(params.bookId);
    console.log("delete Book Result :" + deleteData.resultBook + ", " +deleteData.resultBookContent);

    if(deleteData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        return deleteData;
    }
}