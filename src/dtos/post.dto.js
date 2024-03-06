// post.dto.js

export const postImgResponseDTO = (body, image, like, storage, name) => {
    let image_url;
    if(image.length != 0) {
        image_url = []
        for (let i = 0; i < image.length; i++){
            image_url.push(image[i].image_url);
        }
    }
    else {
        image_url = null;
    }
    
    return {
        "post_id": body.post_id,
        "user_id": body.user_id,
        "nickname": name,
        "title": body.title, 
        "content": body.content,
        "image_url": image_url,
        "postLike": like.postLike,
        "postLikeCount": like.postLikeCount,
        "storage": storage,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}

export const postResponseDTO = (body, like, storage) => {

    return {
        "post_id": body.post_id,
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "postLike": like.postLike,
        "postLikeCount": like.postLikeCount,
        "storage": storage,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}

