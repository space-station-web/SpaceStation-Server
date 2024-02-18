export const getReferenceSql = "SELECT post_id, user_id, title, created_at FROM post WHERE post_id = ?";

export const addCommentSql = "INSERT INTO comment (comment_id, user_id, content, post_id, create_at) VALUES (?, ?, ?, ?, ?)";

export const getCommentSql = "SELECT * FROM comment WHERE comment_id = ?";

export const deleteCommentSql = "DELETE FROM comment WHERE comment_id = ?";

export const patchCommentSql = "UPDATE comment SET content = ?, create_at = ? WHERE comment_id = ? AND user_id = ?";

export const getCommentUserSql = "SELECT user_id FROM comment WHERE comment_id = ?";