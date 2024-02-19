export const insertUserSql = "INSERT INTO user (name, nickname, email, pw, phone, b_date, alarm, created, status, provider, salt) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

export const confirmEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";


export const confirmNicknameSql = "SELECT EXISTS(SELECT 1 FROM user WHERE nickname = ?) as isExistNickname";


export const emailcheckSql = "SELECT * FROM user WHERE name = ? AND phone = ? AND b_date = ?";


export const userCheckSql = "SELECT * FROM user WHERE email = ?";

export const getRefresh = "SELECT refresh FROM user WHERE id = ?";

export const checkUserSql = "SELECT EXISTS(SELECT 1 FROM user WHERE name = ? AND email = ? ) as isExistUser";


export const updateUserPwSql = "UPDATE user SET pw = ?, update_date = ?, salt = ? WHERE id = ?";

export const getStoredPw = "SELECT pw, salt FROM user WHERE id = ?";


export const getUserId = "SELECT id FROM user WHERE name = ? AND email = ?";

export const getUserInfo = "SELECT nickname, image FROM user WHERE id = ?";

export const changeUserNick = "UPDATE user SET nickname = ?, update_date = ? WHERE id = ?";

export const changeUserImg = "UPDATE user SET image = ?, update_date = ? WHERE id = ?";

export const getUseridByNickname = "SELECT id FROM user WHERE BINARY nickname = ?";