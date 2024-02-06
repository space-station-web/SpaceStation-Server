import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { getMyPosts } from "./myposts.sql.js";

export const getPosts = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const myPosts = await pool.query(getMyPosts, [userId]);
        console.log('myposts:', userId, myPosts)
        if(myPosts.length == 0){
            return -1;
        }

        conn.release();
        return myPosts[0];
        
    } catch (err) {
        throw new BaseError(err);
    }
}
