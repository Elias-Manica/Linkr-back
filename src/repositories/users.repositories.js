import {connection }from "../database/database.js";

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
			json_build_object(
				'id', u1.id,
				'username', u1.username,
				'pictureurl', u1.pictureurl
			) AS "userInfo",
			p1.id,
			p1.link,
			p1.text,
			p1.date,
			u1.id AS "userid",
			u1.username,
			u1.pictureurl,
			count(DISTINCT u2.username) AS "qtdlikes",
			json_agg(DISTINCT u2.username) AS "nameusersliked",
			json_agg(DISTINCT h2.name) AS "hashtags"
		FROM posts p1
		JOIN users u1 ON p1.userid = u1.id
		LEFT JOIN likes l1 ON p1.id = l1.postid
		LEFT JOIN users u2 ON u2.id = l1.userid
		LEFT JOIN posthashtags h1 ON h1.postid = p1.id
		LEFT JOIN hashtags h2 ON h2.id = h1.hashtagid
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

export { listUsers, listUserPosts, listUsersById };
