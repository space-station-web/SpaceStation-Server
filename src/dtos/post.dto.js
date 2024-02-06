// post.dto.js

export const postResponseDTO = (body) => {
    return {
        "user_id": body.user_id,
        "title": body.title, 
        "content": body.content,
        "create_at": body.create_at,
        "visibility": body.visibility,
        "self_destructTime": body.self_destructTime
    };
}
