export const searchStorageBookSql = "SELECT * FROM bookStorage "
                                    + "WHERE book_id = ? AND user_id = ? AND storage_type_id = ?;";

export const addStorageBookSql = "INSERT INTO bookStorage (book_storage_id, book_id, user_id, storage_type_id) VALUES (?, ?, ?, ?);";

export const delStorageBookSql = "DELETE FROM bookStorage WHERE book_id = ? AND user_id = ? AND storage_type_id = ?;";

// 책 일련번호로 그 책에 대한 보관정보 전체삭제
export const delStorageByBookIdSql = "DELETE FROM bookStorage WHERE book_id = ?;";
// 보관함 일련번호로 그 보관함에 대한 책 보관정보 전체삭제
export const delStorageBookByTypeIdSql = "DELETE FROM bookStorage WHERE storage_type_id = ?;";


export const searchStoragePostTypeSql = "SELECT storage_type_id FROM postStorage WHERE post_id = ? AND user_id = ?;";

export const searchStoragePostSql = "SELECT * FROM postStorage WHERE post_id = ? AND user_id = ?;";


export const addStoragePostSql = "INSERT INTO postStorage (post_storage_id, post_id, user_id, storage_type_id) VALUES (?, ?, ?, ?);";

export const delStoragePostSql = "DELETE FROM postStorage WHERE post_id = ? AND user_id = ? AND storage_type_id = ?;";

// 글 일련번호로 그 글에 대한 보관정보 전체삭제
export const delStorageByPostIdSql = "DELETE FROM postStorage WHERE post_id = ?;";
// 보관함 일련번호로 그 보관함에 대한 글 보관정보 전체삭제
export const delStoragePostByTypeIdSql = "DELETE FROM postStorage WHERE storage_type_id = ?;";


export const getPostStorageListByUserIdSql = `SELECT ps.*, p.*, MIN(ti.topicimage_id) as min_topicimage_id, ti.image_url
FROM postStorage AS ps
JOIN post AS p ON ps.post_id = p.post_id
LEFT JOIN topicsimage AS ti ON p.post_id = ti.post_id
WHERE ps.storage_type_id = ?
GROUP BY p.post_id
ORDER BY p.created_at ASC
LIMIT ? OFFSET ?;
`
