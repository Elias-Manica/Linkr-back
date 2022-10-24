import { serverErrorResponse } from "./helper.controllers.js";

import {
  listPosts,
  listHashtags,
  listPostsBasedOnNameHashtag,
  deletePostsBasedOnId,
  deletelikesBasedOnPostid,
  deleteHashtagBasedOnPostid,
} from "../repositories/posts.repositories.js";

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

async function listPostsBasedOnHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const response = await listPostsBasedOnNameHashtag(hashtag);

    res.status(200).send(response.rows);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function deletePost(req, res) {
  const id = res.locals.postid;

  try {
    await deleteHashtagBasedOnPostid(id);

    await deletelikesBasedOnPostid(id);

    await deletePostsBasedOnId(id);

    res.sendStatus(204);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export {
  listTimeline,
  listHashtagsFunction,
  listPostsBasedOnHashtag,
  deletePost,
};
