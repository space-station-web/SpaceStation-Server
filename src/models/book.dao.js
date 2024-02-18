import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { createBookSql, createBookContentsSql, createBookContentsImgSql,
         readBookListSql, readBookListAllSql,
         readBookSql, readBookContentsSql, readBookContentSql, 
         updateBookSql, updateBookContentsSql, 
         deleteBookSql, deleteBookContentsSql, deleteBookContentsImgSql, 
         searchBookImgByBookIdSql, checkBookUserSql } from "./book.sql.js";
import { delStorageByBookIdSql } from "./storage.sql.js";
import { delLikeByBookIdSql } from "./like.sql.js";
import { delBookReplyByBookIdSql } from "./reply.sql.js";
import { deleteImage } from "../middleware/book.image.js";

export const addBook = async (data) => {
    try{
        const conn = await pool.getConnection();

        const resultBook = await pool.query(createBookSql, 
            [null, data.title, data.intro, data.category, data.thumbnail, new Date(), data.user_id] );

        conn.release();

        return { "bookId": resultBook[0].insertId };
        
    }catch (err) {
        throw new BaseError(err);
    }
}

export const addBookContent = async (data) => {
    try{
        const conn = await pool.getConnection();

        const resultContent = await pool.query(createBookContentsSql, 
                [null, data.title, data.text, new Date(), data.index, data.book_id] );
        
        let resultContentImg = 0;
        if ((data.files != []) && (resultContent[0].insertId != -1)) {
            for (let i = 0; i < data.files.length; i++) {    // 사진 저장
                const img = data.files[i];
                const result = await pool.query(createBookContentsImgSql, 
                    [null, img.location, img.key, resultContent[0].insertId] ); 
                if (result != -1) {
                    resultContentImg++;
                }
            }
        }
        
        conn.release();

        return { "bookContentId": resultContent[0].insertId, "resultImgs": resultContentImg };
        
    }catch (err) {
        throw new BaseError(err);
    }
}

export const getBookList = async (category) => {
    try {
        console.log("getBookList category : " + category);
        const conn = await pool.getConnection();
        let book = -1;
        if (category == 'all') {
            book = await pool.query(readBookListAllSql);
        } else {
            book = await pool.query(readBookListSql, [category]);
        }

        if(book.length == 0){
            return -1;
        }

        conn.release();
        return book;
        
    } catch (err) {
        throw new BaseError(err);
    }
}
export const getBook = async (bookId) => {
    try {
        console.log("getBook bookId : " + bookId);
        const conn = await pool.getConnection();
        const book = await pool.query(readBookSql, [bookId]);

        if(book.length == 0){
            return -1;
        }

        conn.release();
        return book;
        
    } catch (err) {
        throw new BaseError(err);
    }
}
export const getContents = async (bookId) => {
    try {
        console.log("getContents bookId : " + bookId);
        const conn = await pool.getConnection();
        const bookContents = await pool.query(readBookContentsSql, [bookId]);

        if(bookContents.length == 0){
            return -1;
        }

        conn.release();
        return bookContents;
        
    } catch (err) {
        throw new BaseError(err);
    }
}
export const getContent = async (bookContentId) => {
    try {
        console.log("getContents bookId : " + bookContentId);
        const conn = await pool.getConnection();
        const bookContent = await pool.query(readBookContentSql, [bookContentId]);

        if(bookContent.length == 0){
            return -1;
        }

        conn.release();
        return bookContent;
        
    } catch (err) {
        throw new BaseError(err);
    }
}

export const upBook = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultBook = await pool.query(updateBookSql, 
            [data.title, data.intro, data.category, data.id]);

        console.log("resultBook : " + resultBook[0].affectedRows);
        let resultBookContets = 0
        for (let i = 0; i < data.contents.length; i++) {
            let element = data.contents[i];
            let resultBookContent = await pool.query(updateBookContentsSql, 
                [element.title, element.context, element.index, element.id] );
            if (resultBookContent[0].affectedRows != 0) {
                resultBookContets++;
            }
        }

        conn.release();
        return { "resultBook": resultBook[0].affectedRows, "resultContents": resultBookContets };
        
    } catch (err) {
        throw new BaseError(err);
    }
}

export const delBook = async (bookId) => {
    try {
        const conn = await pool.getConnection();
        const BookImg = await pool.query(searchBookImgByBookIdSql, [bookId]);

        let resultBookContentImgs = 0;
        for (let i = 0; i < BookImg[0].length; i++) {
            console.log("BookImg : " + BookImg[0][i].book_image_id);
            const resultBookImg = await pool.query(deleteBookContentsImgSql, [BookImg[0][i].book_image_id]);
            if (resultBookImg == -1) {
                deleteImage(BookImg[0][i].file_key)
            }
            resultBookContentImgs += resultBookImg[0].affectedRows;            
        }
        const resultBookContent = await pool.query(deleteBookContentsSql, [bookId]);
        const resultBookStorage = await pool.query(delStorageByBookIdSql, [bookId]);
        const resultBookLike = await pool.query(delLikeByBookIdSql, [bookId]);
        const resultBookReply = await pool.query(delBookReplyByBookIdSql, [bookId]);
        const resultBook = await pool.query(deleteBookSql, [bookId]);
        conn.release();
        // 책 썸네일 삭제 (S3)
        
        return {"deletedBook": resultBook[0].affectedRows, 
                "deletedBookContent": resultBookContent[0].affectedRows,
                "deletedBookContentImages": resultBookContentImgs,
                "deletedBookReply": resultBookReply[0].affectedRows,
                "deletedBookStorage": resultBookStorage[0].affectedRows,
                "deletedBookLike": resultBookLike[0].affectedRows };        
    } catch (err) {
        throw new BaseError(err);
    }
}

export const checkBookUser = async (bookId) => {
    try {
        console.log("checkBookUser bookId : " + bookId);
        const conn = await pool.getConnection();
        const checkResult = await pool.query(checkBookUserSql, [bookId]);

        if(checkResult.length == 0){
            return -1;
        }

        conn.release();
        return checkResult;
        
    } catch (err) {
        throw new BaseError(err);
    }
}

