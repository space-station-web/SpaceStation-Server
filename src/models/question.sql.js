// question.sql.js

export const getQuestionContent = "SELECT question_id, content FROM questions WHERE MONTH(DATE) = MONTH(CURRENT_DATE()) AND DAY(DATE) = DAY(CURRENT_DATE());"

export const postAnswerSql = "INSERT INTO answer (question_id, answer_id, user_id, content, create_at) VALUES (?, ?, ?, ?, ?);"

export const getAnswerSql = "SELECT * FROM answer WHERE answer_id = ? AND user_id = ?;"

export const getQnAnswerSql = "SELECT q.question_id, q.content AS question_content, a.user_id, a.answer_id, a.create_at AS answer_created_at, a.content AS answer_content FROM answer a JOIN questions q ON a.question_id = q.question_id WHERE a.question_id = ? AND a.user_id = ?;";

export const getQuestionIdSql = "SELECT question_id FROM questions WHERE date = CURRENT_DATE();"

// export const getQuestionContent = "SELECT * FROM questions WHERE date = DATE_ADD(NOW(), INTERVAL 0 HOUR)";

export const getUserAnswerSql = `select  q.question_id, q.content as question_content, a.content as answer_content, q.DATE
from    answer as a left join questions as q on a.question_id = q.question_id where   user_id = ?
order by q.DATE asc limit ? offset ?;`

export const checktodayAnswerSql = "SELECT answer_id FROM answer WHERE question_id = ? AND user_id = ?;"

export const getAnswerUserSql = "SELECT user_id FROM answer WHERE answer_id = ?;";

export const deleteAnswerSql = "DELETE FROM answer WHERE answer_id = ?;"

export const updateAnswerSql = "UPDATE answer SET content = ?, create_at = ?WHERE answer_id = ?;"