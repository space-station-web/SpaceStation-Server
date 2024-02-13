import * as draftDao from '../models/draft.dao.js';
import * as postDao from '../models/post.dao.js';

// 임시저장
export const addDraft = async (body) => {
    const draftData = await draftDao.addDraft({
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content
    });

    const getDraftData = await draftDao.getDraft(draftData.draft_id);

    return getDraftData;
}

// 임시저장 글 수정 후 임시저장
export const patchDraft = async (draft_id, body) => {
    const draftData = await draftDao.patchDraft(draft_id, {
        "title": body.title, 
        "content": body.content
    });

    const getDraftData = await draftDao.getDraft(draft_id);

    return getDraftData;
}

// 임시저장 글 수정 후 저장
export const postDraft = async (draft_id, body) => {
    const user_id = await draftDao.getUserId(draft_id);

    const draftData = await draftDao.postDraft(draft_id, {
        "user_id": user_id[0],
        "title": body.title, 
        "content": body.content,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    });

    const getDraftData = await postDao.getPost(draftData.post_id);

    const result = await draftDao.deleteDraft(draft_id);

    return getDraftData;
}

// 임시저장 글 삭제
export const deleteDraft = async (draft_id) => {
    try {
        const result = await draftDao.deleteDraft(draft_id);
        console.log(result);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}