import { response } from "../../config/response.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import * as draftService from '../services/draft.service.js';
import * as draftDao from '../models/draft.dao.js';

// 임시저장
export const addDraft = async (req, res, next) => {
    console.log("임시저장");
    console.log("body:", req.body);
    console.log("files", req.files);
    const files = req.files ?? []; 

    return res.send(response(status.SUCCESS, await draftService.addDraft(req.body, req.userID, files)));
};

// 임시저장 글 수정 후 임시저장
export const patchDraft = async (req, res, next) => {
    console.log("임시저장-수정-임시저장");
    console.log("body:", req.body, "params: ", req.params);

    const { draft_id } = req.params;

    return res.send(response(status.SUCCESS, await draftService.patchDraft(draft_id, req.body, req.userID)));
};

// 임시저장 글 수정 후 저장
export const postDraft = async (req, res, next) => {
    console.log("임시저장-수정-저장");
    console.log("body:", req.body);
    console.log("files", req.files);
    const files = req.files ?? []; 

    const { draft_id } = req.params;

    return res.send(response(status.SUCCESS, await draftService.postDraft(draft_id, req.body, req.userID, files)));
};

// 임시저장 글 삭제
export const deleteDraft = async (req, res, next) => {
    console.log("임시저장 삭제");

    const { draft_id } = req.params;

    return res.send(response(status.SUCCESS, await draftService.deleteDraft(draft_id, req.userID)));
};

// 임시저장 전체 조회
export const getAllDraft = async (req, res, next) => {
    console.log("임시저장 전체 조회");

    return res.send(response(status.SUCCESS, await draftDao.getAllDraft(req.userID)));
};

// 임시저장 상세 조회
export const getDraft = async (req, res, next) => {
    console.log("임시저장 상세 조회");

    const { draft_id } = req.params;

    return res.send(response(status.SUCCESS, await draftService.getDraft(draft_id, req.userID)));
};