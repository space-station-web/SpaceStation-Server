export const bookDTO = (book, contents) => {
    const contentList = [];
    console.log("book :" + book[0][0].id);
    console.log("contents[0][0] :" + contents[0][0].id);
    for (let i = 0; i < contents[0].length; i++) {
        contentList.push(bookContentsDTO(contents[0][i]));
    }
    return {
        "id": book[0][0].id, 
        "title": book[0][0].title,
        "intro": book[0][0].intro,
        "category": book[0][0].category,
        "user_id": book[0][0].user_id,
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