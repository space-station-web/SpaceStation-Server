// post.dto.js

export const postResponseDTO = (body, image) => {
    let image_url
    if(image != -1) {
        for (let i = 0; i < image.length - 1; i++){
            image_url = image[i].image_url + ", ";
        }
        image_url += image[image.length - 1].image_url;
    }
    
    return {
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "image_url": image_url,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}
