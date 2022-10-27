import { connection } from "../database/database.js";

async function listPosts(limit, offset) {
  const response = await connection.query(
    `
    SELECT 
      P1.id, P1.link, P1.text, P1.date,  
      U1.id AS "userid", U1.username, U1.pictureurl, 
      COUNT( DISTINCT U2.username) AS "qtdlikes", 
      json_agg(DISTINCT U2.username) AS "nameusersliked",
      json_agg(DISTINCT U2.id) AS "usersIdLiked", 
      json_agg( DISTINCT h2.name) AS "hashtags",
      COUNT( DISTINCT C1.description) AS "qtdcomments"
      FROM posts P1 
      JOIN users U1 ON P1.userid = U1.id 
      LEFT JOIN likes L1 ON P1.id = L1.postid 
      LEFT JOIN users U2 ON U2.id = L1.userid 
      LEFT JOIN posthashtags H1 ON H1.postid = P1.id 
      LEFT JOIN hashtags H2 ON h2.id = h1.hashtagid 
      LEFT JOIN comments C1 ON C1.postid = P1.id
      GROUP BY P1.id, U1.username, U1.pictureurl, U1.id 
      ORDER BY P1.id DESC 
    LIMIT $1
	  OFFSET $2;`,
    [limit, offset]
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

async function insertLikeInPosts(postid, userid) {
  const response = await connection.query(
    `
    INSERT INTO likes (postid, userid) VALUES ($1, $2);
  `,
    [postid, userid]
  );
  return response;
}

async function deleteLikeInPosts(postid, userid) {
  const response = await connection.query(
    `
    DELETE FROM likes WHERE postid = $1 AND userid = $2;
  `,
    [postid, userid]
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

async function insertComment(postid, userid, description) {
  const response = await connection.query(
    `
    INSERT INTO comments (postid, userid, description) VALUES ($1, $2, $3);
  `,
    [postid, userid, description]
  );
  return response;
}

async function listComment(postid) {
  const response = await connection.query(
    `
	SELECT 
		json_agg( jsonb_build_object('idcomment', C1.id, 'userid', U3.id, 'username', U3.username, 'urluser', U3.pictureurl,  'comment', C1.description, 'follow', CASE WHEN F1.id > 0 THEN true ELSE false END, 'owner', CASE WHEN  P1.userid = U3.id THEN true ELSE false END) ORDER BY C1.id) AS "comments" 
		FROM posts P1 
		JOIN users U1 ON P1.userid = U1.id 
		LEFT JOIN comments C1 ON C1.postid = P1.id
		LEFT JOIN users U3 ON U3.id = C1.userid
		LEFT JOIN followers F1 ON U3.id = F1.follow
		WHERE P1.id = $1
		GROUP BY P1.id
  	LIMIT 20;
  	`,
    [postid]
  );
  return response;
}

async function listPostsPagination(offset) {
  const response = await connection.query(
    `
    SELECT 
		P1.id, P1.link, P1.text, P1.date,  
		U1.id AS "userid", U1.username, U1.pictureurl, 
		COUNT( DISTINCT U2.username) AS "qtdlikes", 
		json_agg(DISTINCT U2.username) AS "nameusersliked",
		json_agg(DISTINCT U2.id) AS "usersIdLiked", 
		json_agg( DISTINCT h2.name) AS "hashtags",
		COUNT( DISTINCT C1.description) AS "qtdcomments"
	  FROM posts P1 
	  JOIN users U1 ON P1.userid = U1.id 
	  LEFT JOIN likes L1 ON P1.id = L1.postid 
	  LEFT JOIN users U2 ON U2.id = L1.userid 
	  LEFT JOIN posthashtags H1 ON H1.postid = P1.id 
	  LEFT JOIN hashtags H2 ON h2.id = h1.hashtagid 
	  LEFT JOIN comments C1 ON C1.postid = P1.id
	  GROUP BY P1.id, U1.username, U1.pictureurl, U1.id 
	  ORDER BY P1.id DESC 
	  LIMIT 10
	  OFFSET $1;
    `,
    [offset]
  );
  return response;
}

async function hasPost(postid) {
  const response = await connection.query(`SELECT * FROM posts WHERE id=$1;`, [
    postid,
  ]);
  return response;
}

async function hasLikedPost(postid, userid) {
  const response = await connection.query(
    `SELECT * FROM likes WHERE postid=$1 AND userid=$2;`,
    [postid, userid]
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
  insertComment,
  listComment,
  listPostsPagination,
  hasPost,
  hasLikedPost,
};
