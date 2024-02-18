import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { draftImgPostResponseDTO, draftImgResponseDTO } from "../dtos/draft.dto.js";
import * as draftDao from '../models/draft.dao.js';
import * as postDao from '../models/post.dao.js';

// 임시저장
export const addDraft = async (body, user_id, image) => {
    const draftData = await draftDao.addDraft({
        "user_id": user_id,
        "title": body.title, 
        "content": body.content,
        "post_id": body.topic_id
    });

    if(image != -1){
        const draftImgData = await draftDao.draftImg({
            "image": image,
            "draft_id": draftData.draft_id,
            "user_id": user_id
        })
    }

    const getDraftData = await draftDao.getDraft(draftData.draft_id, user_id);

    return getDraftData;
}

// 임시저장 글 수정 후 임시저장
export const patchDraft = async (draft_id, body, user_id) => {    
    const draftUser = await draftDao.getDraftUser(draft_id)
    if (draftUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }
    const draftData = await draftDao.patchDraft(user_id, draft_id, {
        "title": body.title, 
        "content": body.content
    });

    const getDraftData = await draftDao.getDraft(draft_id, user_id);

    return getDraftData;
}

// 임시저장 글 수정 후 저장
export const postDraft = async (draft_id, body, user_id, image) => {
    const draftUser = await draftDao.getDraftUser(draft_id)
    if (draftUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }

    const draftData = await draftDao.postDraft({
        "title": body.title, 
        "content": body.content,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    }, user_id);

    if(image != -1){
        const postImgData = await postDao.postImg({
            "image": image,
            "post_id": draftData.post_id,
            "user_id": user_id
        })
    }

    const getDraftData = await postDao.getPost(draftData.post_id);

    const result = await draftDao.deleteDraft(draft_id);

    if (getDraftData.body.visibility == "터뜨리기") {
        const explodePostData = postDao.explodePost(draftData.post_id, getDraftData.body.self_destructTime);
        return explodePostData;
    }

    return draftImgPostResponseDTO(getDraftData.body, getDraftData.Img);
}

// 임시저장 글 삭제
export const deleteDraft = async (draft_id, user_id) => {
    try {
        const draftUser = await draftDao.getDraftUser(draft_id)
        if (draftUser[0][0].user_id != user_id) {
            return new BaseError(status.POST_UNAUTHORIZED);
        }

        const result = await draftDao.deleteDraft(draft_id);
        console.log(result);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 임시저장 상세 조회
export const getDraft = async (draft_id, user_id) => {
    const draftUser = await draftDao.getDraftUser(draft_id)
    if (draftUser[0][0].user_id != user_id) {
        return new BaseError(status.POST_UNAUTHORIZED);
    }

    const result = await draftDao.getDraft(draft_id);

    return result;
}
