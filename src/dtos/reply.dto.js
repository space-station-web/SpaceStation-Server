export const bookReplyDTO = (reply) => {
    return {
        "book_reply_id": reply.book_reply_id, 
        "nickname": reply.nickname,
        "content": reply.content,
        "create_at": reply.create_at,
        "front_reply_id": reply.front_reply_id,
        "book_id": reply.book_id,
        "user_id": reply.user_id,
    };
}

export const bookRepliesDTO = (data) => {
    const replies = [];
    for (let i = 0; i < data[0].length; i++) {
        replies.push(bookReplyDTO(data[0][i]));
    }
    return replies;
}

export const postReplyDTO = (reply) => {
    return {
        "post_reply_id": reply.post_reply_id, 
        "nickname": reply.nickname,
        "content": reply.content,
        "create_at": reply.create_at,
        "front_reply_id": reply.front_reply_id,
        "post_id": reply.post_id,
        "user_id": reply.user_id,
    };
}

export const postRepliesDTO = (data) => {
    const replies = [];
    for (let i = 0; i < data[0].length; i++) {
        replies.push(postReplyDTO(data[0][i]));
    }
    return replies;
}