// post.dto.js

export const postImgResponseDTO = (body, image, like) => {
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
        "title": body.title, 
        "content": body.content,
        "image_url": image_url,
        "like": like.like_count,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}

export const postResponseDTO = (body, like) => {

    return {
        "post_id": body.post_id,
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "like": like.like_count,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}

