import { status } from '../../config/response.status.js';
import { getTempData } from '../services/temp.service.js';
import { CheckFlag } from '../services/temp.service.js';
import { response } from '../../config/response.js';

export const tempTest = (req, res, next) => {
    res.send(response(status.SUCCESS, "This is TEST! >.0"));
};

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}; 