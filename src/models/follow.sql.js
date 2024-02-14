export const getFollowByUserId = (limit) => limit > 0 ? `
select f.id, f.user_id, u2.nickname, f.follow_id, u.nickname as follow_nickname from follow as f
left join user as u on f.follow_id = u.id
left join user as u2 on f.user_id = u2.id 
where user_id = ? limit ? offset ?;` : "select * from follow where user_id = ?;"

export const createFollowSql = "INSERT INTO follow (user_id, follow_id) "
                                + "VALUES (?, ?);";

export const deleteFollowSqlById = "DELETE FROM follow WHERE id = ?;";

export const deleteFollowSqlByFollowIdAndUserId = "DELETE FROM follow WHERE user_id = ? and follow_id = ?;";
