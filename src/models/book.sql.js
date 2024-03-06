export const createBookSql = "INSERT INTO book (book_id, title, intro, category, thumbnail, create_at, user_id) "
                                + "VALUES (?, ?, ?, ?, ?, ?, ?);";

export const createBookContentsSql = "INSERT INTO bookContents (book_contents_id, content_title, content_text, content_create_at, content_index, book_id) "
                                + "VALUES (?, ?, ?, ?, ?, ?);";
export const createBookContentsImgSql = "INSERT INTO bookImage (book_image_id, image, file_key, index_id) "
                                + "VALUES (?, ?, ?, ?);";

export const readBookListAllSql = "SELECT * FROM book ORDER BY create_at DESC;";
export const readBookListSql = "SELECT * FROM book WHERE category = ? ORDER BY create_at DESC;";
export const readBookSql = "SELECT * FROM book AS b INNER JOIN user AS u ON u.id = b.user_id WHERE b.book_id = ?;";
export const readBookContentsSql = "SELECT * FROM bookContents AS bc "
                                + "LEFT JOIN bookImage AS bi ON bc.book_contents_id = bi.index_id "
                                + "WHERE bc.book_id = ? ORDER BY content_index;";
export const readBookContentSql = "SELECT * FROM bookContents AS bc "
                                + "LEFT JOIN bookImage AS bi ON bc.book_contents_id = bi.index_id "
                                + "WHERE bc.book_contents_id = ?;";

export const updateBookSql = "UPDATE book "
                            + "SET title = ?, intro = ?, category = ? "
                            + "WHERE book_id = ?;";
export const updateBookContentsSql = "UPDATE bookContents "
                                + "SET content_title = ?, content_text = ?, content_index = ? "
                                + "WHERE book_contents_id = ?;";

export const deleteBookSql = "DELETE FROM book WHERE book_id = ?;";
export const deleteBookContentsSql = "DELETE FROM bookContents WHERE book_id = ?;";
export const deleteBookContentsImgSql = "DELETE FROM bookImage WHERE book_image_id = ?;";

export const searchBookImgByBookIdSql = "SELECT book_image_id, file_key FROM bookImage AS bi "
                                        + "INNER JOIN bookContents AS bc ON bc.book_contents_id = bi.index_id WHERE bc.book_id = ?;";

export const checkBookUserSql = "SELECT user_id FROM book WHERE book_id = ?;";
