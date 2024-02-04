import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { getTempData } from '../services/book.service.js';
import { CheckFlag } from '../services/temp.service.js';

export const bookCreate = (req, res, next) => {
    console.log("bookCreate!");
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, getTempData()));
};

export const bookRead = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

export const bookUpdate = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

export const bookDelete = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}