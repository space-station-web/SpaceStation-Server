export const getFollowByUserId = (limit) => limit > 0 ? "select * from follow where user_id = ? limit ? offset ?;" : "select * from follow where user_id = ?;"

export const createFollowSql = "INSERT INTO follow (user_id, follow_id) "
                                + "VALUES (?, ?);";

export const deleteFollowSqlById = "DELETE FROM follow WHERE id = ?;";

export const deleteFollowSqlByFollowIdAndUserId = "DELETE FROM follow WHERE user_id = ? and follow_id = ?;";
