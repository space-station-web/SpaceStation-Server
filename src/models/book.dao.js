import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { createBookSql, createBookContentsSql, readBookSql, readBookContentsSql, 
        updateBookSql, updateBookContentsSql, deleteBookSql, deleteBookContentsSql } from "./book.sql.js";

export const addBook = async (data) => {
    try{
        const conn = await pool.getConnection();

        const resultBook = await pool.query(createBookSql, 
            [null, data.title, data.intro, data.category, null, data.user_id] );

        const resultBookContents = 0
        for (let i = 0; i < data.contents.length; i++) {
            const element = data.contents[i];
            const resultBookContent = await pool.query(createBookContentsSql, 
                [null, element.title, element.content, null, element.index, element.book_id] );
            if (resultBookContent[0].insertId != 0 != 0) {
                resultBookContents++;
            }
        }

        conn.release();

        return { "book_id": resultBook[0].insertId, "resultContents": resultBookContents };
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getBook = async (bookId) => {
    try {
        const conn = await pool.getConnection();
        const [book] = await pool.query(readBookSql, bookId);
        const [bookContents] = await pool.query(readBookContentsSql, bookId);

        console.log(book);

        if(book.length == 0){
            return -1;
        }

        conn.release();
        return {"book": book, "bookContents": bookContents};
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const updateBook = async (data) => {
    try {
        const conn = await pool.getConnection();
        const resultBook = await pool.query(updateBookSql, 
            [data.title, data.intro, data.category, data.id]);

        const resultBookContets = 0
        for (let i = 0; i < data.contents.length; i++) {
            const element = data.contents[i];
            const resultBookContent = await pool.query(createBookContentsSql, 
                [element.title, element.content, element.index, element.id] );
            if (resultBookContent[0].insertId != 0) {
                resultBookContets++;
            }
        }

        conn.release();
        return { "book_id": resultBook[0].insertId, "resultContents": resultBookContets };
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const deleteBook = async (bookId) => {
    try {
        const conn = await pool.getConnection();
        const resultBookContent = await pool.query(deleteBookContentsSql, bookId);
        const resultBook = await pool.query(deleteBookSql, bookId);

        conn.release();
        return {"resultBook": resultBook, "resultBookContent": resultBookContent};
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}