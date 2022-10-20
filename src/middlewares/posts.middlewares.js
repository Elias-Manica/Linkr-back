import { serverErrorResponse } from "../controllers/helper.controllers.js";

import { listPosts } from "../repositories/posts.repositories.js";

async function hasMore20posts(req, res, next) {
  try {
    const response = await listPosts();

    if (response.rows.length > 20) {
      response.rows.reverse();
      res.locals.responseReverse = response.rows.slice(0, 20);
      next();
      return;
    }

    response.rows.reverse();
    res.locals.responseReverse = response.rows;
    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export { hasMore20posts };
