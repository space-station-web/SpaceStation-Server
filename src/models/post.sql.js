// post.sql.js

export const getUserID = "SELECT * FROM user WHERE id = ?";

export const getLastPost = "SELECT MAX(post_id) as max_id FROM post WHERE user_id = ?"

export const LastPost = "SELECT MAX(post_id) as max_id FROM post"

export const insertPostSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime) VALUES (?, ?, ?, ?, ?, ?, ?)";

export const deletePostSql = "DELETE FROM post WHERE post_id = ?";

export const getPostSql = "SELECT post_id, user_id, title, content, visibility, created_at, self_destructTime FROM post WHERE post_id = ?";

export const updatePostSql = "UPDATE post SET title = ?, content = ?, visibility = ?, self_destructTime = ? WHERE post_id = ?"

export const getPostsByUserIdSql = `SELECT * FROM post WHERE user_id = ? order by created_at desc limit ? offset ?`;

export const getAllPostsSql = ({orderColumn, orderDirection}) => `
with post_with_like as (select p.post_id, count(pl.post_like_id) as like_count
    from post as p
            left join postLike as pl on p.post_id = pl.post_id
    group by p.post_id)

    select *
    from    post as p
    left join post_with_like as pl on pl.post_id = p.post_id
    order by ${orderColumn} ${orderDirection}
    limit ? offset ?;
`

export const getFollowPostsByUserIDSql = `select  *
from    post as p
join follow as f on p.user_id = f.follow_id and f.user_id = ?;`