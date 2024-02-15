// post.dto.js

export const postResponseDTO = (body, image) => {
    return {
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "image_url": image,
        "create_at": body.created_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}
