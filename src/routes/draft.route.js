import express from "express";
import asyncHandler from 'express-async-handler';
import { addDraft, deleteDraft, getAllDraft, getDraft, patchDraft, postDraft } from "../controllers/draft.controller.js";
import { tokenChecker } from "../../config/jwt-util.js";
import { imageUploaderdraft } from "../middleware/draft.image.js";
import { imageUploader } from "../middleware/image.uploader.js";

export const draftRouter = express.Router();

// 임시저장 전체 조회
draftRouter.get('/', tokenChecker, asyncHandler(getAllDraft))

// 임시저장 상세 조회
draftRouter.get('/:draft_id', tokenChecker, asyncHandler(getDraft));

// 임시저장
draftRouter.post('/', tokenChecker, imageUploaderdraft.array('image', 10), asyncHandler(addDraft));
//draftRouter.post('/', tokenChecker, imageUploader.array('image'), asyncHandler(addDraft));

// 임시저장 수정 후 임시저장
draftRouter.patch('/:draft_id', tokenChecker, asyncHandler(patchDraft));
// draftRouter.patch('/:draft_id', tokenChecker, imageUploader.array('image'), asyncHandler(patchDraft));

// 임시저장 수정 후 저장
draftRouter.post('/:draft_id/posts', imageUploader.array('image', 10), tokenChecker, asyncHandler(postDraft));
// draftRouter.post('/:draft_id/posts', tokenChecker, imageUploader.array('image'), asyncHandler(postDraft));

// 임시저장 삭제
draftRouter.delete('/:draft_id', tokenChecker, asyncHandler(deleteDraft));
