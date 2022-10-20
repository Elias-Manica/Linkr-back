import { serverErrorResponse } from "./helper.controllers.js";

import { listPosts } from "../repositories/posts.repositories.js";

async function listTimeline(req, res) {
  try {
    const response = await listPosts();

    res.status(200).send(response.rows);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export { listTimeline };
