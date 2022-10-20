import connection from "../database/database.js";

async function listPosts() {
  const response = await connection.query(
    `SELECT P1.id, P1.link, P1.text, P1.date, U1.username, U1.pictureurl, COUNT( DISTINCT U2.username) AS "qtdlikes", json_agg(DISTINCT U2.username) AS "nameusersliked", json_agg( DISTINCT h2.name) AS "hashtags" FROM posts P1 JOIN users U1 ON P1.userid = U1.id LEFT JOIN likes L1 ON P1.id = L1.postid LEFT JOIN users U2 ON U2.id = L1.userid LEFT JOIN posthashtags H1 ON H1.postid = P1.id LEFT JOIN hashtags H2 ON h2.id = h1.hashtagid GROUP BY P1.id, U1.username, U1.pictureurl ORDER BY P1.id DESC LIMIT 20;`
  );
  return response;
}

export { listPosts };
