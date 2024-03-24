// post.sql.js

export const insertPostSql = "INSERT INTO post (post_id, user_id, title, content, visibility, created_at, self_destructTime) VALUES (?, ?, ?, ?, ?, ?, ?)";

export const deletePostSql = "DELETE FROM post WHERE post_id = ?";

export const getPostSql = "SELECT post_id, user_id, title, content, visibility, created_at, self_destructTime FROM post WHERE post_id = ?";

// export const getPostSql = "SELECT p.post_id, p.title, p.content, p.created_at, p.self_destructTime, p.visibility, p.topic_id, p.referencetopic_id, p.user_id, t.image_url "
//                        + "FROM post AS p "
//                        + "INNER JOIN topicsimage AS t ON p.post_id = t.post_id "
//                        + "WHERE t.post_id = ? GROUP BY p.post_id;";

export const updatePostSql = "UPDATE post SET title = ?, content = ?, visibility = ?, self_destructTime = ? WHERE post_id = ? AND user_id = ?"

// 특정 사용자 글 조회
export const getPostsByUserIdSql = `SELECT post.*, topicsimage.image_url FROM post
LEFT JOIN (SELECT post_id, MIN(image_url) AS image_url FROM topicsimage GROUP BY post_id) AS topicsimage ON post.post_id = topicsimage.post_id WHERE post.user_id = ? ORDER BY post.created_at DESC limit ? offset ?`;

// 전체 글 조회
export const getAllPostsSql = ({orderColumn, orderDirection}) => `
with post_with_like as (
  select u.name, p.post_id, count(pl.post_like_id) as like_count
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
  select p.title, p.content, pl.*, img.image_url
  from    post as p
      left join post_with_like as pl on pl.post_id = p.post_id
      left join post_with_image as pwi on pwi.post_id = p.post_id
  left join topicsimage as img on pwi.image_id = img.topicimage_id
  order by ${orderColumn} ${orderDirection}
 
`;
// 전체 글 조회 sql에서 LIMIT ? OFFSET ?; 제외함 

// 글 검색
export const getSearchPostsSql = ({orderType, postSearchWord}) => {
    let sql;
    if (orderType === "title") {
      sql = `SELECT post.*, MIN(topicsimage.topicimage_id) as min_topicimage_id, topicsimage.image_url FROM post
      LEFT JOIN topicsimage ON post.post_id = topicsimage.post_id
      LEFT JOIN postStorage AS ps ON post.post_id = ps.post_id
      WHERE post.visibility = '전체공개' AND ${orderType} LIKE '%${postSearchWord}%' GROUP BY post.post_id`;
    } else if (orderType === "nickname"){
      sql = `SELECT post.*, ti.image_url,
      CASE WHEN ps.post_id IS NOT NULL THEN 'true' ELSE 'false' END AS isStorage FROM post
      INNER JOIN user ON user.id = post.user_id
      LEFT JOIN (
      SELECT post_id, MIN(topicimage_id) AS min_topicimage_id FROM topicsimage GROUP BY post_id) AS min_ti ON post.post_id = min_ti.post_id
      LEFT JOIN topicsimage AS ti ON min_ti.min_topicimage_id = ti.topicimage_id
      LEFT JOIN postStorage AS ps ON post.post_id = ps.post_id
      WHERE post.visibility = '전체공개'
      and ${orderType} LIKE '%${postSearchWord}%'`;
    } else{
        throw new Error(`Unsupported orderType: ${orderType}`);}
    return sql;
}

// 이웃 글 조회
export const getFollowPostsByUserIDSql = `SELECT p.*, ti.image_url FROM post AS p 
JOIN follow AS f ON p.user_id = f.follow_id AND f.user_id = ?
LEFT JOIN topicsimage AS ti ON p.post_id = ti.post_id `;

export const getTopicSql = "SELECT * FROM topic WHERE topic_id = ?";

export const getRandomTopicSql = "SELECT * FROM topic WHERE user_id NOT IN (?) ORDER BY RAND() LIMIT 1";

export const getUnviewdTopicSql = "SELECT t.topic_id FROM topic t WHERE NOT EXISTS (SELECT 1 FROM viewedtopic vt WHERE vt.user_id = ? AND vt.topic_id = t.topic_id)";

export const updateUnviewedTopicSql = "UPDATE topic SET viewed = false WHERE user_id = ?";

export const updateViewedTopicSql = "UPDATE topic SET viewed = true WHERE user_id = ? AND topic_id = ?";

export const insertViewedTopicSql = "INSERT INTO viewedtopic (user_id, topic_id, viewed_at) VALUES (?, ?, NOW())";

export const deleteViewedTopicSql = "DELETE FROM viewedtopic WHERE user_id = ?";

export const postImgSql = "INSERT INTO topicsimage (topicimage_id, image_url, post_id, user_id) VALUES (?, ?, ?, ?)";

export const getPostImgSql = "SELECT image_url FROM topicsimage WHERE post_id = ?";

export const getPostUserSql = "SELECT user_id FROM post WHERE post_id = ?;";

export const deletePostImgSql = "DELETE FROM topicsimage WHERE post_id = ?";

export const getImgCountSql = "SELECT COUNT(*) AS photo_count FROM topicsimage WHERE post_id = ?;"

export const getPostLikeCountSql = "SELECT COUNT(*) AS like_count FROM postLike WHERE post_id = ?;"

export const explodePostSql = "DELETE FROM post WHERE post_id = ?";

export const getImgSql = "SELECT image_url FROM topicsimage WHERE post_id = ?";

export const addImgSql = "INSERT INTO topicsimage (image_url, post_id, user_id) VALUES (?, ?, ?)";

export const removeImgSql = "DELETE FROM topicsimage WHERE image_url = ? AND post_id = ?";

export const searchNicknameSql = "SELECT nickname FROM user WHERE id = ?;"