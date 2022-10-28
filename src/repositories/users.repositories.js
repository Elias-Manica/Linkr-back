import { connection } from "../database/database.js";

async function listUsersById(id) {
  const result = await connection.query(
    `
        SELECT * FROM users WHERE id = $1;
    `,
    [id]
  );
  return result;
}

async function listUsers(text) {
  const result = await connection.query(
    `
        SELECT * FROM users WHERE users.username LIKE $1;
    `,
    [`${text}%`]
  );
  return result;
}

async function listUserPosts(id) {
  const result = await connection.query(
    `
		SELECT
			P1.id,
			P1.link,
			P1.text,
			P1.date,
			U1.id AS "userid",
			U1.username,
			U1.pictureurl,
			COUNT(DISTINCT U2.username) AS "qtdlikes",
			json_agg(DISTINCT U2.username) AS "nameusersliked",
			json_agg(DISTINCT U2.id) AS "usersIdLiked",
			json_agg(DISTINCT H2.name) AS "hashtags",
			COUNT(DISTINCT C1.id) AS "qtdcomments", 
			COUNT(DISTINCT R1.id) AS "qtdreposts"
		FROM
			posts P1
			JOIN users U1 ON P1.userid = U1.id
			LEFT JOIN likes L1 ON P1.id = L1.postid
			LEFT JOIN users U2 ON U2.id = L1.userid
			LEFT JOIN posthashtags H1 ON H1.postid = P1.id
			LEFT JOIN hashtags H2 ON H2.id = H1.hashtagid
			LEFT JOIN comments C1 ON C1.postid = P1.id
			LEFT JOIN reposts R1 ON R1.postid = P1.id
		WHERE u1.id = $1
		GROUP BY p1.id,
			u1.username,
			u1.pictureurl,
			u1.id
		ORDER BY p1.id DESC
        ;`,
    [id]
  );
  return result;
}

async function followUser(userid, followid) {
  const result = await connection.query(
    `INSERT INTO followers (userid, follow) VALUES ($1, $2);`,
    [userid, followid]
  );
  return result;
}
async function unfollowDelete(userid, followid) {
  const result = await connection.query(
    `DELETE FROM followers WHERE userid = $1 AND follow = $2;`,
    [userid, followid]
  );
  return result;
}
async function verifyFollow(userid, followid) {
  const result = await connection.query(
    `SELECT * FROM followers WHERE userid = $1 AND follow = $2;`,
    [userid, followid]
  );
  return result;
}

async function listFollowing(userid) {
  const result = await connection.query(
    `
		SELECT * FROM followers WHERE userid = $1;
	`,
    [userid]
  );
  return result;
}

export {
  listUsers,
  listUserPosts,
  listUsersById,
  followUser,
  unfollowDelete,
  verifyFollow,
  listFollowing,
};
