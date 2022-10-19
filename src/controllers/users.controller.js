import connection from "../database/database.js";

async function getUserInfo(req, res) {
	try {
		const { id } = req.params;
		if (!id) {
			return res.sendStatus(400);
		}
		const userExists = await connection.query(
			`
      SELECT * FROM users WHERE id = $1;
    `,
			[id]
		);
		if (userExists.rowCount === 0) {
			return res.sendStatus(404);
		}

		const userInfo = await connection.query(
			`
        SELECT 
            users.id, users.username, users.pictureurl,
            json_agg(posts.*) AS posts
        FROM users
        JOIN posts ON users.id = posts.userid
        WHERE users.id = $1
        GROUP BY (users.id)
        ;`,
			[id]
		);
		return res.status(200).send(userInfo.rows[0]);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { getUserInfo };
