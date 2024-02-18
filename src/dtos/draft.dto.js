export const draftImgResponseDTO = (body, image) => {
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
        "draft_id": body.draft_id,
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "image_url": image_url,
        "create_at": body.create_at
    };
}

export const draftImgPostResponseDTO = (body, image) => {
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
        "draft_id": body.draft_id,
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "image_url": image_url,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime,
        "create_at": body.create_at
    };
}