// post.sql.js

export const insertPostSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime, topic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

export const deletePostSql = "DELETE FROM post WHERE post_id = ? AND user_id = ?";

export const getPostSql = "SELECT post_id, user_id, title, content, visibility, created_at, self_destructTime FROM post WHERE post_id = ?";

export const updatePostSql = "UPDATE post SET title = ?, content = ?, visibility = ?, self_destructTime = ? WHERE post_id = ? AND user_id = ?"

export const getPostsByUserIdSql = `SELECT * FROM post WHERE user_id = ? order by created_at desc limit ? offset ?`;

export const getAllPostsSql = ({orderColumn, orderDirection}) => `
with post_with_like as (select u.name, p.post_id, count(pl.post_like_id) as like_count
    from post as p
            left join postLike as pl on p.post_id = pl.post_id
            left join user as u on p.user_id = u.id
    group by p.post_id)

, post_with_image as (
    select  p.post_id, min(img.topicimage_id) as image_id
    from    post_with_like as p
    left join topicsimage as img on p.post_id = img.post_id
    group by p.post_id
)

    select p.title, p.content, pl.*
         , img.image_url
    from    post as p
    left join post_with_like as pl on pl.post_id = p.post_id
    left join post_with_image as pwi on pwi.post_id = p.post_id
    left join topicsimage as img on pwi.image_id = img.topicimage_id
    order by ${orderColumn} ${orderDirection}
    limit ? offset ?;
`

export const getFollowPostsByUserIDSql = `select  *
from    post as p
join follow as f on p.user_id = f.follow_id and f.user_id = ?;`

export const getTopicSql = "SELECT * FROM topic WHERE topic_id = ?";

export const getRandomTopicSql = "SELECT * FROM topic WHERE user_id NOT IN (?) ORDER BY RAND() LIMIT 1";

export const getUnviewdTopicSql = "SELECT t.topic_id FROM topic t WHERE NOT EXISTS (SELECT 1 FROM viewedtopic vt WHERE vt.user_id = ? AND vt.topic_id = t.topic_id)";

export const updateUnviewedTopicSql = "UPDATE topic SET viewed = false WHERE user_id = ?";

export const updateViewedTopicSql = "UPDATE topic SET viewed = true WHERE user_id = ? AND topic_id = ?";

export const insertViewedTopicSql = "INSERT INTO viewedtopic (user_id, topic_id, viewed_at) VALUES (?, ?, NOW())";

export const deleteViewedTopicSql = "DELETE FROM viewedtopic WHERE user_id = ?";