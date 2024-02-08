export const insertUserSql = "INSERT INTO user (name, nickname, email, pw, phone, b_date, alarm, created, status, provider, salt) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";

export const confirmNickname = "SELECT EXISTS(SELECT 1 FROM user WHERE nickname = ?) as isExistNickname";