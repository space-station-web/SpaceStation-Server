// post.dao.js
import { pool } from "../../config/db.config.js";
import { getAllPostsSql, getSearchPostsSql, insertPostSql, deletePostSql,
         getPostSql, updatePostSql, getPostsByUserIdSql, getFollowPostsByUserIDSql, 
         getTopicSql, getUnviewdTopicSql,
         deleteViewedTopicSql, insertViewedTopicSql, postImgSql, getPostImgSql } from "./post.sql.js";

import { status } from "../../config/response.status.js";
import { postResponseDTO } from "../dtos/post.dto.js";

//  전체 글 조회
export const getAllPosts = async({orderColumn, orderDirection, limit, offset}) => {
    try {
        
        const conn = await pool.getConnection();

        const result = await pool.query(getAllPostsSql({orderColumn, orderDirection}), [ 
            limit, offset
        ]);

        conn.release();

        return result[0];
    } catch (err) {
        throw err;
    }
}

// 글 검색 
export const getSearchPost = async({orderType, postSearchWord}) => {
    try {
        
        const conn = await pool.getConnection();

        const result = await pool.query(getSearchPostsSql({orderType, postSearchWord}), [ 
            
        ]);

        conn.release();

        return result[0];
    } catch (err) {
        throw err;
    }
}

// 글 작성
export const writeContent = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertPostSql, [
            null, 
            data.user_id,
            data.title,      
            data.content,    
            data.visibility, 
            new Date(),
            data.self_destructTime,
            data.topic_id
        ]);

        conn.release();

        return { "post_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
}


// 글 삭제
export const deletePost = async (post_id, user_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(deletePostSql, [post_id, user_id]);

        conn.release();

        return "글이 삭제되었습니다.";
    } catch (err) {
        throw err;
    }
    
}

// 글 조회
export const getPost = async (post_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(getPostSql, [post_id]);

        const resultImg = await conn.query(getPostImgSql, [post_id]);

        conn.release();

        console.log("dto: ", postResponseDTO(result[0][0], resultImg[0][0].image_url));

        return postResponseDTO(result[0][0], resultImg[0][0].image_url);
    } catch (err) {
        throw err;
    }
}

// 글 수정
export const updatePost = async (data, post_id, user_id) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(updatePostSql, [
            data.title,      
            data.content,    
            data.visibility,
            data.self_destructTime,
            post_id,
            user_id
        ]);

        conn.release();
    } catch (err) {
        throw err;
    }
}

// 유저의 글 리스트 조회
export const getPostsByUserId = async ({ limit, offset, userId}) => {
    try {
        const conn = await pool.getConnection();
        const myPosts = await pool.query(getPostsByUserIdSql, [userId, limit, offset]);
        if(myPosts.length == 0){
            return -1;
        }

        conn.release();
        return myPosts[0];
        
    } catch (err) {
        throw err;
    }
}

// 유저의 모든 이웃의 글 조회
export const getFollowPostsByUserID = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const myPosts = await pool.query(getFollowPostsByUserIDSql, [userId]);
        if(myPosts.length == 0){
            return -1;
        }

        conn.release();
        return myPosts[0];
    } catch (error) {
        throw err;
    }
}

// 글을 쓸 때 글감을 선택적으로 제공받을 수 있고 글감을 제공받아서 글을 작성했다면 다음에 글을 작성할 때는 새로운 글감을 제공하도록 
// 랜덤으로 제공하되 viewed 모두 1 이면 0으로 전체 초기화

// 조회 안 한 글감 중 랜덤 반환
export const getRandomTopic = async (user_id) => {
    const conn = await pool.getConnection(); 
  
    let unviewedTopics = await conn.query(getUnviewdTopicSql, [user_id]);
  
    console.log("unviewedTopics", unviewedTopics[0]);
  
    if (unviewedTopics[0].length === 0) {
      // 모든 토픽을 다 본 경우에는 'viewedtopic' 테이블에서 해당 사용자의 모든 행을 삭제
      await conn.query(deleteViewedTopicSql, [user_id]);
  
      unviewedTopics = await conn.query(getUnviewdTopicSql, [user_id]);
    }
  
    const randomIndex = Math.floor(Math.random() * unviewedTopics[0].length);
  
    const randomTopicId = unviewedTopics[0][randomIndex].topic_id;
  
    await conn.query(insertViewedTopicSql, [user_id, randomTopicId]);
  
    return getTopic(randomTopicId);
}

// 글감 제공
export const getTopic = async (topic_id) => {
    try {
        const conn = await pool.getConnection(); 
        const [topic] = await conn.query(getTopicSql, [topic_id]);
        console.log(topic[0]);
        conn.release();

        return topic[0];
    } catch (err) {
        throw err;
    }
}

// 이미지 업로드
export const postImg = async(imagedata) => {
    const conn = await pool.getConnection(); 
    const [image] = await conn.query(postImgSql, [
        null,
        imagedata.image_url, 
        imagedata.post_id, 
        imagedata.user_id
    ]);

    conn.release();
}