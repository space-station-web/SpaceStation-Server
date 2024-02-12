export const insertUserSql = "INSERT INTO user (name, nickname, email, pw, phone, b_date, alarm, created, status, provider, salt) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

export const confirmEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";


export const confirmNicknameSql = "SELECT EXISTS(SELECT 1 FROM user WHERE nickname = ?) as isExistNickname";


export const emailcheckSql = "SELECT * FROM user WHERE name = ? AND phone = ? AND b_date = ?";

export const confirmNickname = "SELECT EXISTS(SELECT 1 FROM user WHERE nickname = ?) as isExistNickname";

export const userCheckSql = "SELECT * FROM user WHERE email = ?";

export const getRefresh = "SELECT refresh FROM user WHERE id = ?";

export const usercheckSql = "SELECT EXISTS(SELECT 1 FROM user WHERE name = ? AND email = ? ) as isExistUser";

