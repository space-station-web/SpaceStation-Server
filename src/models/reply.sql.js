export const addBookReplySql = "INSERT INTO bookReply (content, create_at, user_id, book_id, front_reply_id, nickname) "
                                +"VALUES (?, ?, ?, ?, ?, ?)";

export const searchBookReplySql = "SELECT * FROM bookReply WHERE book_reply_id = ?;";

export const searchBookReplyByBookIdSql = "SELECT * FROM bookReply WHERE book_id = ?;";

export const delBookReplySql = "DELETE FROM bookReply WHERE book_reply_id = ?;";

export const delBookReplyByBookIdSql = "DELETE FROM bookReply WHERE book_id = ?;";


export const addPostReplySql = "INSERT INTO postReply (content, create_at, user_id, post_id, front_reply_id, nickname) "
                                +"VALUES (?, ?, ?, ?, ?, ?)";

export const searchPostReplySql = "SELECT * FROM postReply WHERE post_reply_id = ?;";

export const searchPostReplyByPostIdSql = "SELECT * FROM postReply WHERE post_id = ? ;";

export const delPostReplySql = "DELETE FROM postReply WHERE post_reply_id = ?;";

export const delPostReplyByPostIdSql = "DELETE FROM postReply WHERE post_id = ?;";

export const searchNicknameSql = "SELECT nickname FROM user WHERE id = ?;"

export const addnicknameSql = "INSERT INTO postReply (nickname) VALUES (?)"

export const nicknameSql = "SELECT nickname FROM user WHERE id = ?"