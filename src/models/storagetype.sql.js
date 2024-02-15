export const getStorageTypeByUserId = `select * from storageType where user_id = ? and type = ?`

export const addStorageTypeSql = "INSERT INTO storageType (type, user_id) VALUES (?, ?);";

export const deleteStorageTypeSql = "DELETE FROM storageType WHERE storage_type_id = ? AND user_id = ?;";

export const getStorageTypeSql = `SELECT * FROM storageType WHERE user_id = ?`
