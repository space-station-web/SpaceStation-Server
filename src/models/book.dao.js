import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { createBookSql, createBookContentsSql, createBookContentsImgSql,
         readBookSql, readBookContentsSql, readBookContentSql,
         updateBookSql, updateBookContentsSql, deleteBookSql, deleteBookContentsSql, 
         checkBookUserSql } from "./book.sql.js";
import { delStorageByBookIdSql } from "./storage.sql.js";
import { delLikeByBookIdSql } from "./like.sql.js";

export const addBook = async (data) => {
    try{
        const conn = await pool.getConnection();

        const resultBook = await pool.query(createBookSql, 
            [null, data.title, data.intro, data.category, new Date(), data.user_id] );

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
                const thumb = (i == data.thumbnail? 1 : 0);
                const result = await pool.query(createBookContentsImgSql, 
                    [null, img.location, thumb, resultContent[0].insertId] ); 
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
export const getContents = async (bookContentId) => {
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
        const resultBookContent = await pool.query(deleteBookContentsSql, [bookId]);
        const resultBookStorage = await pool.query(delStorageByBookIdSql, [bookId]);
        const resultBookLike = await pool.query(delLikeByBookIdSql, [bookId]);
        const resultBook = await pool.query(deleteBookSql, [bookId]);
        conn.release();
        
        return {"deletedBook": resultBook[0].affectedRows, 
                "deletedBookContent": resultBookContent[0].affectedRows,
                "deletedBookStorage": resultBookStorage[0].affectedRows,
                "deletedBookLike": resultBookLike[0].affectedRows };        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
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