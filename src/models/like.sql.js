export const searchLikeBookSql = "SELECT * FROM bookLike WHERE book_id = ? AND user_id = ?;";

export const addLikeBookSql = "INSERT INTO bookLike (book_like_id, book_id, user_id) VALUES (?, ?, ?);";

export const delLikeBookSql = "DELETE FROM bookLike WHERE book_id = ? AND user_id = ?;";

export const delLikeByBookIdSql = "DELETE FROM bookLike WHERE book_id = ?;";

export const searchLikeBookCountSql = "SELECT COUNT(user_id) AS cnt FROM bookLike WHERE book_id = ?;";


export const searchLikePostSql = "SELECT * FROM postLike WHERE post_id = ? AND user_id = ?;";

export const addLikePostSql = "INSERT INTO postLike (post_like_id, post_id, user_id) VALUES (?, ?, ?);";

export const delLikePostSql = "DELETE FROM postLike WHERE post_id = ? AND user_id = ?;";

export const delLikeByPostIdSql = "DELETE FROM postLike WHERE post_id = ?;";

export const searchLikePostCountSql = "SELECT COUNT(user_id) AS cnt FROM postLike WHERE post_id = ?;";
