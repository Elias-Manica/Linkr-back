import { connection } from "../database/database.js";

async function listPosts() {
  const response = await connection.query(
    `
    SELECT 
      P1.id, P1.link, P1.text, P1.date,  
      U1.id AS "userid", U1.username, U1.pictureurl, 
      COUNT( DISTINCT U2.username) AS "qtdlikes", 
      json_agg(DISTINCT U2.username) AS "nameusersliked",
      json_agg(DISTINCT U2.id) AS "usersIdLiked", 
      json_agg( DISTINCT h2.name) AS "hashtags" 
    FROM posts P1 
    JOIN users U1 ON P1.userid = U1.id 
    LEFT JOIN likes L1 ON P1.id = L1.postid 
    LEFT JOIN users U2 ON U2.id = L1.userid 
    LEFT JOIN posthashtags H1 ON H1.postid = P1.id 
    LEFT JOIN hashtags H2 ON h2.id = h1.hashtagid 
    GROUP BY P1.id, U1.username, U1.pictureurl, U1.id 
    ORDER BY P1.id DESC 
    LIMIT 20;`
  );
  return response;
}

async function listHashtags() {
  const response = await connection.query(
    `SELECT  hashtags.id, hashtags.name, COUNT(posthashtags.hashtagid) AS "quantidade" FROM posthashtags LEFT JOIN hashtags ON hashtags.id = posthashtags.hashtagid GROUP BY hashtags.name, hashtags.id ORDER BY quantidade DESC LIMIT 10;`
  );

  return response;
}

async function listPostsBasedOnNameHashtag(name) {
  const response = await connection.query(
    `
    SELECT 
      P1.id, P1.link, P1.text, P1.date, 
      U1.id AS "userid", U1.username, U1.pictureurl, 
      COUNT( DISTINCT U2.username) AS "qtdlikes", 
      json_agg(DISTINCT U2.username) AS "nameusersliked",
      json_agg(DISTINCT U2.id) AS "usersIdLiked", 
      json_agg( DISTINCT h2.name) AS "hashtags" 
    FROM posts P1 
    JOIN users U1 ON P1.userid = U1.id 
    LEFT JOIN likes L1 ON P1.id = L1.postid 
    LEFT JOIN users U2 ON U2.id = L1.userid 
    LEFT JOIN posthashtags H1 ON H1.postid = P1.id 
    LEFT JOIN hashtags H2 ON h2.id = h1.hashtagid 
    WHERE h2.name = $1 
    GROUP BY P1.id, U1.username, U1.pictureurl, U1.id  
    ORDER BY P1.id DESC 
    LIMIT 20 ;`,
    [name]
  );

  return response;
}

async function listPostBasedOnId(id) {
  const response = await connection.query(`SELECT * FROM posts WHERE id=$1`, [
    id,
  ]);
  return response;
}

async function deletePostsBasedOnId(id) {
  const response = await connection.query(`DELETE FROM posts WHERE id = $1;`, [
    id,
  ]);
  return response;
}

async function deletelikesBasedOnPostid(postId) {
  const response = await connection.query(
    `DELETE FROM likes WHERE postid=$1;`,
    [postId]
  );
  return response;
}

async function deleteHashtagBasedOnPostid(postId) {
  const response = await connection.query(
    `DELETE FROM posthashtags WHERE postid=$1;`,
    [postId]
  );
  return response;
}

async function listHashtag(hashtag) {
  const response = await connection.query(
    `SELECT * FROM hashtags WHERE name=$1;`,
    [hashtag]
  );
  return response;
}

async function insertHashtag(name) {
  const response = await connection.query(
    `INSERT INTO hashtags (name) VALUES ($1);`,
    [name]
  );
  return response;
}

async function listPostCreated(userid, text) {
  const response = await connection.query(
    `SELECT * FROM posts WHERE userid=$1 AND "text"=$2 ORDER BY id DESC;`,
    [userid, text]
  );
  return response;
}

async function insertHashtagPost(postid, hashtagid) {
  const response = await connection.query(
    `INSERT INTO posthashtags (postid, hashtagid) VALUES ($1, $2);`,
    [postid, hashtagid]
  );
  return response;
}

async function insertLikeInPosts(userid, postid) {
  const response = await connection.query(
    `
    INSERT INTO likes (userid, postid) VALUES ($1, $2);
  `,
    [userid, postid]
  );
  return response;
}

async function deleteLikeInPosts(userid, postid) {
  const response = await connection.query(
    `
    DELETE FROM likes WHERE userid = $1 AND postid = $2;
  `,
    [userid, postid]
  );
  return response;
}

async function editPost(postid, text) {
  const response = await connection.query(
    `UPDATE posts SET "text" = $1 WHERE id=$2;`,
    [postid, text]
  );
  return response;
}

async function listHashtagBasedOnName(name) {
  const response = await connection.query(
    `SELECT  hashtags.id, hashtags.name FROM posthashtags LEFT JOIN hashtags ON hashtags.id = posthashtags.hashtagid WHERE hashtags.name=$1;`,
    [name]
  );
  return response;
}

async function listNameHashtag(name) {
  const response = await connection.query(
    `SELECT * FROM hashtags WHERE name=$1;`,
    [name]
  );
  return response;
}

export {
  listPosts,
  listHashtags,
  listPostsBasedOnNameHashtag,
  listPostBasedOnId,
  deletePostsBasedOnId,
  deletelikesBasedOnPostid,
  deleteHashtagBasedOnPostid,
  listHashtag,
  insertHashtag,
  listPostCreated,
  insertHashtagPost,
  insertLikeInPosts,
  deleteLikeInPosts,
  editPost,
  listHashtagBasedOnName,
  listNameHashtag,
};
