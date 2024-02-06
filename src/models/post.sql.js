// post.sql.js

export const getUserID = "SELECT * FROM user WHERE id = ?";

export const getLastPost = "SELECT MAX(post_id) as max_id FROM post WHERE user_id = ?"

export const LastPost = "SELECT MAX(post_id) as max_id FROM post"

export const insertPostSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime) VALUES (?, ?, ?, ?, ?, ?, ?)";

export const deletePostSql = "DELETE FROM post WHERE post_id = ?";

export const getPostSql = "SELECT post_id, user_id, title, content, visibility, created_at, self_destructTime FROM post WHERE post_id = ?";

export const updatePostSql = "UPDATE post SET title = ?, content = ?, visibility = ?, self_destructTime = ? WHERE post_id = ?"