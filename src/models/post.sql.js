// post.sql.js

export const insertPostSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime, topic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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

export const getTopicSql = "SELECT * FROM topic WHERE topic_id = ?";

export const getRandomTopicSql = "SELECT * FROM topic WHERE user_id NOT IN (?) ORDER BY RAND() LIMIT 1";

export const getUnviewdTopicSql = "SELECT topic_id FROM topic WHERE user_id = ? AND viewed = false";

export const updateUnviewedTopicSql = "UPDATE topic SET viewed = false WHERE user_id = ?";

export const updateViewedTopicSql = "UPDATE topic SET viewed = true WHERE user_id = ? AND topic_id = ?";