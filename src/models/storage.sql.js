export const searchStorageBookSql = "SELECT * FROM bookStorage WHERE book_id = ? AND user_id = ?;";

export const addStorageBookSql = "INSERT INTO bookStorage (book_storage_id, book_id, user_id) VALUES (?, ?, ?);";

export const delStorageBookSql = "DELETE FROM bookStorage WHERE book_id = ? AND user_id = ?;";

export const delStorageByBookIdSql = "DELETE FROM bookStorage WHERE book_id = ?;";


export const searchStoragePostSql = "SELECT * FROM postStorage WHERE post_id = ? AND user_id = ?;";

export const addStoragePostSql = "INSERT INTO postStorage (post_storage_id, post_id, user_id) VALUES (?, ?, ?);";

export const delStoragePostSql = "DELETE FROM postStorage WHERE post_id = ? AND user_id = ?;";

export const delStorageByPostIdSql = "DELETE FROM postStorage WHERE post_id = ?;";