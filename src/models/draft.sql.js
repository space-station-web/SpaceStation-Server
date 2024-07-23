export const addDraftSql = "INSERT INTO draft (draft_id, user_id, title, content, create_at) VALUES (?, ?, ?, ?, ?)";

export const getDraftSql = "SELECT * FROM draft WHERE draft_id = ?";

export const updateDraftSql = "UPDATE draft SET title = ?, content = ?, create_at = ? WHERE draft_id = ? AND user_id = ?";

export const postDraftSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime) VALUES (?, ?, ?, ?, ?, ?, ?)";

export const getDraftUserSql = "SELECt user_id FROM draft WHERE draft_id = ?";

export const deleteDraftSql = "DELETE FROM draft WHERE draft_id = ?";

export const getAllDraftSql = "SELECT draft_id, user_id, title, create_at FROM draft WHERE user_id = ? ORDER BY create_at DESC";

export const draftImgSql = "INSERT INTO draftimage (draftimage_id, image_url, draft_id) VALUES (?, ?, ?)";

export const getDraftImgSql = "SELECT image_url FROM draftimage WHERE draft_id = ?";

export const deleteDraftImgSql = "DELETE FROM draftimage WHERE draft_id = ?";