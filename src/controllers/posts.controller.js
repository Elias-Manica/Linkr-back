import { serverErrorResponse } from "./helper.controllers.js";

import { listPosts, listHashtags } from "../repositories/posts.repositories.js";

async function listTimeline(req, res) {
  try {
    const response = await listPosts();

    res.status(200).send(response.rows);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function listHashtagsFunction(req, res) {
  try {
    const response = await listHashtags();

    res.status(200).send(response.rows);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { listTimeline, listHashtagsFunction };
