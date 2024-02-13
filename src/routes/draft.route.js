import express from "express";
import asyncHandler from 'express-async-handler';
import { addDraft, deleteDraft, getAllDraft, getDraft, patchDraft, postDraft } from "../controllers/draft.controller.js";

export const draftRouter = express.Router();

// 임시저장 전체 조회
draftRouter.get('/', asyncHandler(getAllDraft))

// 임시저장 상세 조회
draftRouter.get('/:draft_id', asyncHandler(getDraft));

// 임시저장
draftRouter.post('/', asyncHandler(addDraft));

// 임시저장 수정 후 임시저장
draftRouter.patch('/:draft_id', asyncHandler(patchDraft));

// 임시저장 수정 후 저장
draftRouter.post('/:draft_id/posts', asyncHandler(postDraft));

// 임시저장 삭제
draftRouter.delete('/:draft_id', asyncHandler(deleteDraft));
