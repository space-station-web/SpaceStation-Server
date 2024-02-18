
export const refererenceDateDto = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return {
        date: `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`
    };
};

export const referenceDto = (data) => {
    return {
        "post_id": data.post_id,
        "user_id": data.user_id,
        "title": data.title,
        "date": data.created_at
    };
};

