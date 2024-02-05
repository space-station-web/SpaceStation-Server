import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
// import { status } from "../../config/response.status.js";
import { getAllQuestions } from "./questions.sql.js";

export const getQuestions = async () => {
    try {
        const conn = await pool.getConnection();
        const questions = await pool.query(getAllQuestions);

        if(questions.length == 0){
            return -1;
        }

        conn.release();
        return questions[0];
        
    } catch (err) {
        throw new BaseError(err);
    }
}