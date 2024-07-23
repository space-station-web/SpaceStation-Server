// post.dao.js
import { pool } from "../../config/db.config.js";
import { getAllPostsSql,  getSearchPostsSql, insertPostSql, deletePostSql,
         getPostSql, updatePostSql, getPostsByUserIdSql, getFollowPostsByUserIDSql, 
         getTopicSql, getUnviewdTopicSql,
         deleteViewedTopicSql, insertViewedTopicSql, postImgSql, 
         getPostImgSql, getPostUserSql, deletePostImgSql, getImgCountSql, getPostLikeCountSql, explodePostSql, getImgSql, addImgSql, removeImgSql, searchNicknameSql } from "./post.sql.js";

import { status } from "../../config/response.status.js";
import { postImgResponseDTO, postResponseDTO } from "../dtos/post.dto.js";
import { BaseError } from "../../config/error.js";
import { delPostReplyByPostIdSql } from "./reply.sql.js";
import { delLikeByPostId, searchLikePost } from "./like.dao.js";
import { delStorageByPostIdSql } from "./storage.sql.js";
import { delLikeByPostIdSql } from "./like.sql.js";

//  전체 글 조회
export const getAllPosts = async(userID, {orderColumn, orderDirection, limit, offset}) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getAllPostsSql({orderColumn, orderDirection}), [limit, offset],[userID]);
        conn.release();
        return result[0];
    } catch (err) {
        throw err;
    }
}

// 유저의 모든 이웃의 글 조회
export const getFollowPostsByUserID = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const myPosts = await pool.query(getFollowPostsByUserIDSql,[userId]);
        if(myPosts.length == 0){
            return -1;
        }
        conn.release();
        return myPosts[0];
    } catch (err) {
        throw err;
    }
}

// 글 검색 
export const getSearchPost = async(userID,{orderType, postSearchWord}) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getSearchPostsSql({orderType, postSearchWord}), [        
        userID]);
        //console.log(result);
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
            data.self_destructTime
        ]);

        conn.release();

        return { "post_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
}


// 글 삭제
export const deletePost = async (post_id) => {
    try{
        const conn = await pool.getConnection();

        const postLike = await conn.query(delLikeByPostIdSql, [post_id]);
        const postImg = await conn.query(deletePostImgSql, [post_id]);
        const postReply = await conn.query(delPostReplyByPostIdSql, [post_id]);
        const resultStorage = await pool.query(delStorageByPostIdSql, [post_id]);
        const postResult = await conn.query(deletePostSql, [post_id]);

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

        const result = await conn.query(getPostSql, [post_id]); // 내용
        const resultImg = await conn.query(getPostImgSql, [post_id]); // 사진

        conn.release();
        console.log("length: ", resultImg[0].length);


        return {"body": result[0][0], "Img": resultImg[0]};
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
        const myPosts = await pool.query( getPostsByUserIdSql, [userId, limit, offset]);
        if(myPosts.length == 0){
            return -1;
        }
        conn.release();
        return myPosts[0];
        
    } catch (err) {
        throw error;
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

    conn.release();
  
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

    let resultContentImg = 0;
    console.log("length: ", imagedata.image.length);
        if ((imagedata.image != []) && (imagedata.post_id != -1)) {
            for (let i = 0; i < imagedata.image.length; i++) {    // 사진 저장
                const img = imagedata.image[i];
                const result = await pool.query(postImgSql, 
                    [null, img.location, imagedata.post_id, imagedata.user_id] ); 
                if (result != -1) {
                    resultContentImg++;
                }
            }
        }
    conn.release();
}

// 유저 조회
export const getPostUser = async (post_id) => {
    try {
        const conn = await pool.getConnection();
        const result = await pool.query(getPostUserSql, [post_id]);

        if(result.length == 0){
            return -1;
        }

        conn.release();
        return result;
        
    } catch (err) {
        throw err;
    }
}

// 이미지 수정
/*export const updateImg = async(imagedata, post_id, user_id) => {
    const conn = await pool.getConnection(); 

    const newImageUrls = Array.isArray(imagedata) ? imagedata.map(img => img.location) : [imagedata.location];
    const result = await pool.query(getImgSql, [post_id]);
    // console.log("result: ", result[0]);
    const existingImages = result[0]; // 첫 번째 요소를 선택

    const existingImageUrls = existingImages.map(image => image.image_url);

    console.log('newImageUrls:', newImageUrls);
    console.log('existingImages:', existingImages);

    const imagesToAdd = newImageUrls.filter(url => !existingImageUrls.includes(url));
    const imagesToRemove = existingImageUrls.filter(url => !newImageUrls.includes(url));

    console.log('imagesToAdd:', imagesToAdd);
    console.log('imagesToRemove:', imagesToRemove);

    // 이미지 추가
    for (let url of imagesToAdd) {
        await pool.query(addImgSql, [url, post_id, user_id]);
    }

    // 이미지 삭제
    for (let url of imagesToRemove) {
        await pool.query(removeImgSql, [url, post_id]);
    }

    conn.release();
}*/
export const updateImg = async(imagedata, post_id, user_id) => {
    const conn = await pool.getConnection(); 

    const newImageUrls = Array.isArray(imagedata) ? imagedata.map(img => img.location) : [imagedata.location];
    
    // 기존 이미지 삭제
    const result = await pool.query(getImgSql, [post_id]);
    const existingImages = result[0]; // 첫 번째 요소를 선택
    console.log('newImageUrls:', newImageUrls);
    console.log('existingImages:', existingImages);

    for (let image of existingImages) {
        await pool.query(removeImgSql, [image.image_url, post_id]);
    }

    // 새 이미지 추가
    for (let url of newImageUrls) {
        await pool.query(addImgSql, [url, post_id, user_id]);
    }

    conn.release();
}


// 이미지 수
/*export const getImgCount = async(post_id) => {
    const conn = await pool.getConnection();
    const result = await pool.query(getImgCountSql, [post_id]);
    console.log("result: ", result);

    return result;
}*/

// 터뜨리기
export const explodePost = async (post_id, time) => {
    let delay = time * 1000;

    console.log("delay: ", delay);
    setTimeout(async () => {
        const conn = await pool.getConnection();
        const result = await pool.query(explodePostSql, [post_id]);
        conn.release();
    }, delay);

    return "자동 삭제되었습니다."
}

// 닉네임
export const searchNickname = async (user_id) => {
    const conn = await pool.getConnection();
    const result = await pool.query(searchNicknameSql, [user_id]);
    console.log(result[0][0]);
    conn.release();
    return result[0][0].nickname;
}