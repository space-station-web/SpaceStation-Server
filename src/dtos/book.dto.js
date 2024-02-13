export const bookDTO = (book, storage, like, contents) => {
    const contentList = [];
    for (let i = 0; i < contents[0].length; i++) {
        contentList.push(bookContentsDTO(contents[0][i]));
    }

    return {
        "book_id": book[0][0].book_id, 
        "title": book[0][0].title,
        "intro": book[0][0].intro,
        "category": book[0][0].category,
        "user_id": book[0][0].user_id,
        "storage": storage,
        "like": like,
        "contents": contentList
    };
}

export const bookContentsDTO = (content) => {
    return {
        "book_contents_id": content.book_contents_id, 
        "title": content.title, 
        "content": content.content,
        "create_at": content.create_at,
        "index": content.index,
        "book_id": content.book_id
    };
}