export const bookDTO = (book, storage, like, contents) => {
    return {
        "book_id": book[0][0].book_id, 
        "user_id": book[0][0].user_id,
        "nickname": book[0][0].nickname,
        "title": book[0][0].title,
        "intro": book[0][0].intro,
        "category": book[0][0].category,
        "storage": storage,
        "like": like,
        "contents": bookContentsDTO(contents)
    };
}

export const bookContentsDTO = (contents) => {
    const contentList = [];
    let content;
    const imgList = [];
    const set = new Set();
    for (let i = 0; i < contents[0].length; i++) {
        if (set.has(contents[0][i].book_contents_id)) {
            imgList.push(contents[0][i].image);
        }
        else {
            if (i == 0) {
                content = {
                    "book_contents_id": contents[0][i].book_contents_id, 
                    "content_title": contents[0][i].content_title,
                    "content_text": contents[0][i].content_text
                }
                imgList.push(contents[0][i].image);
                set.add(contents[0][i].book_contents_id);
                continue;
            }
            contentList.push({
                "book_contents_id": content.book_contents_id, 
                "content_title": content.content_title,
                "content_text": content.content_text,
                "image": imgList
            });
            content = {
                "book_contents_id": contents[0][i].book_contents_id, 
                "content_title": contents[0][i].content_title,
                "content_text": contents[0][i].content_text,
            }
            imgList.push(contents[0][i].image);
            set.add(contents[0][i].book_contents_id);
        }
    }
    if (content != null){
        contentList.push({
            "book_contents_id": content.book_contents_id, 
            "content_title": content.content_title,
            "content_text": content.content_text,
            "image": imgList
        }); 
    }
    
    console.log("imgList" + imgList);
    return contentList;
}