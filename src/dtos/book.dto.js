export const bookDTO = (book, contents) => {
    const contentList = [];
    for (let i = 0; i < contents[0].length; i++) {
        contentList.push(contents[0][i]);
    }
    return {
        "id": book[0].id, 
        "title": book[0].title,
        "intro": book[0].intro,
        "category": book[0].category,
        "user_id": book[0].user_id,
        "contents": contentList
    };
}

export const bookContentsDTO = (content) => {
    return {
        "id": content.id, 
        "title": content.title, 
        "content": content.content,
        "create_at": content.create_at,
        "index": content.index,
        "book_id": content.book_id
    };
}