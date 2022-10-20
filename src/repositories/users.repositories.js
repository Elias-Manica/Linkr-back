import connection from "../database/database";

async function listUsers(text) {
	const result = await connection.query(
		`
        SELECT * FROM users WHERE users.username LIKE $1;
    `,
		['${text}%']
	);
	return result;
}

export { listUsers };
