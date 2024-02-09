export const createBookSql = "INSERT INTO book (id, title, intro, category, create_at, user_id) "
                                + "VALUES (?, ?, ?, ?, ?, ?);";
export const createBookContentsSql = "INSERT INTO bookContents (id, title, content, create_at, `index`, book_id) "
                                + "VALUES (?, ?, ?, ?, ?, ?);";

export const readBookSql = "SELECT * FROM book WHERE id = ?;";
export const readBookContentsSql = "SELECT * FROM bookContents WHERE book_id = ? ORDER BY `index`;";

export const updateBookSql = "UPDATE book "
                            + "SET title = ?, intro = ?, category = ? "
                            + "WHERE id = ?;";
export const updateBookContentsSql = "UPDATE bookContents "
                                + "SET title = ?, content = ?, `index` = ? "
                                + "WHERE id = ?;";

export const deleteBookSql = "DELETE FROM book WHERE id = ?;";

export const deleteBookContentsSql = "DELETE FROM bookContents WHERE book_id = ?;";

export const checkBookUserSql = "SELECT user_id FROM book WHERE id = ?;";