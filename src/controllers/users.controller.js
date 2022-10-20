import connection from "../database/database.js";
import { listUsers } from "../repositories/users.repositories.js";
import {
	badRequestResponse,
	serverErrorResponse,
	STATUS_CODE,
} from "./helper.controllers.js";

async function getUserInfo(req, res) {
	try {
		const { id } = req.params;
		if (!id) {
			badRequestResponse(res);
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
		return res.status(STATUS_CODE.OK).send(userInfo.rows[0]);
	} catch (error) {
		serverErrorResponse(res, error);
	}
}

async function searchUsers(req, res) {
	try {
		const { text } = req.body;
		const users = await listUsers(text);

		return res.status(STATUS_CODE.OK).send(users.rows);
	} catch (error) {
		serverErrorResponse(res, error);
	}
}

export { getUserInfo, searchUsers };
