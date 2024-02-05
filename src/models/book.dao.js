import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { createBookSql, createBookContentsSql, readBookSql, readBookContentsSql, 
         updateBookSql, updateBookContentsSql, deleteBookSql, deleteBookContentsSql, 
         checkBookUserSql } from "./book.sql.js";

export const addBook = async (data) => {
    try{
        const conn = await pool.getConnection();

        const resultBook = await pool.query(createBookSql, 
            [null, data.title, data.intro, data.category, new Date(), data.user_id] );

        let resultBookContents = 0
        console.log("resultBook[0].insertId :" + resultBook[0].insertId);
        for (let i = 0; i < data.contents.length; i++) {
            let element = data.contents[i];
            let resultBookContent = await pool.query(createBookContentsSql, 
                [null, element.title, element.context, new Date(), element.index, resultBook[0].insertId] );
            if (resultBookContent[0].insertId != 0 != 0) {
                resultBookContents++;
            }
        }

        conn.release();

        return { "bookId": resultBook[0].insertId, "resultContents": resultBookContents };
        
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
        const resultBook = await pool.query(deleteBookSql, [bookId]);

        conn.release();
        return {"deletedBook": resultBook[0].affectedRows, "deletedBookContent": resultBookContent[0].affectedRows};
        
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