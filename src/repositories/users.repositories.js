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
            users.id, 
            users.username, 
            users.pictureurl,
            json_agg(posts.*) AS posts
        FROM users
        JOIN posts ON users.id = posts.userid
        WHERE users.id = $1
        GROUP BY (users.id)
        ;`,
		[id]
	);
	return result;
}

export { listUsers, listUserPosts, listUsersById };
