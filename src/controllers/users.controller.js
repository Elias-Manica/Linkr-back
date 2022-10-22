import {
	listUserPosts,
	listUsers,
	listUsersById,
} from "../repositories/users.repositories.js";
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
		const userExists = await listUsersById(id);
		if (userExists.rowCount === 0) {
			return res.sendStatus(404);
		}

		const userInfo = await listUserPosts(id);

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
