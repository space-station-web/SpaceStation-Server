import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { createBook, readBook, updateBook, deleteBook } from "../services/book.service.js";

export const bookCreate = async (req, res, next) => {
    console.log("bookCreate!");
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await createBook(req.body)));
};

export const bookRead = async (req, res, next) => {
    console.log("bookRead!");

    res.send(response(status.SUCCESS, await readBook(req.params)));
};

export const bookUpdate = async (req, res, next) => {
    console.log("bookUpdate!");

    res.send(response(status.SUCCESS, await updateBook(req.params, req.body)));
};

export const bookDelete = async (req, res, next) => {
    console.log("bookDelete!");

    res.send(response(status.SUCCESS, await deleteBook(req.params, req.body)));
};