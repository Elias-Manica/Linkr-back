import {
  badRequestResponse,
  serverErrorResponse,
} from "../controllers/helper.controllers.js";

import {
  hasLikedPost,
  hasPost,
  getRepostByIds,
  listPostBasedOnId,
} from "../repositories/posts.repositories.js";

async function isAvaiableToDelete(req, res, next) {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const response = await listPostBasedOnId(id);

    if (response.rows.length === 0) {
      res.status(404).send({ message: "O post não foi encontrado" });
      return;
    }

    if (user.userid !== response.rows[0].userid) {
      res
        .status(401)
        .send({ message: "Você não tem permissão para excluir esse post!" });
      return;
    }

    res.locals.postid = response.rows[0].id;

    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function isAvaiableToEdit(req, res, next) {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const response = await listPostBasedOnId(id);

    if (response.rows.length === 0) {
      res.status(404).send({ message: "O post não foi encontrado" });
      return;
    }

    if (user.userid !== response.rows[0].userid) {
      res
        .status(401)
        .send({ message: "Você não tem permissão para editar esse post!" });
      return;
    }

    res.locals.post = response.rows[0];

    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function isAvaiableToRepost(req, res, next) {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const checkPostId = await listPostBasedOnId(id);

    if (checkPostId.rows.length === 0) {
      res.status(404).send({ message: "O post não foi encontrado" });
      return;
    }

    const checkRepost = (await getRepostByIds(id, user.userid)).rows[0];

    if (checkRepost) {
      res
        .status(401)
        .send({ message: "Você não tem permissão para repostar esse post!" });
      return;
    }

    res.locals.postid = checkPostId.rows[0].id;

    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

function hasDescription(req, res, next) {
  const { description } = req.body;

  if (!description) {
    return badRequestResponse(res, "description was not sent");
  }
  next();
}

function idIsValid(req, res, next) {
  const { postId } = req.params;

  if (!Number(postId)) {
    res.status(400).send({ message: "Number invalid" });
    return;
  }

  next();
}

function queryIsValid(req, res, next) {
  const { page } = req.query;

  if (page) {
    console.log(page);
    if (Number(page) < 0) {
      res.status(400).send({ message: "Query invalid" });
      return;
    }

    if (Number(page) === 0) {
      next();
      return;
    }
    if (!Number(page)) {
      res.status(400).send({ message: "Query invalid" });
      return;
    }
  }

  next();
}

async function isPostValid(req, res, next) {
  const { postId } = req.params;
  try {
    const response = await hasPost(postId);

    if (response.rows.length === 0) {
      res.status(404).send({ message: "Post not found!" });
      return;
    }

    res.locals.response = response.rows;
    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function postIsLiked(req, res, next) {
  const { postId } = req.params;
  const user = res.locals.user;
  try {
    const response = await hasLikedPost(postId, user.userid);
    console.log(response, " likou");

    if (response.rows.length > 0) {
      res.status(400).send({ message: "you already liked this post" });
      return;
    }
    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

async function postIsavableToDeslike(req, res, next) {
  const { postId } = req.params;
  const user = res.locals.user;
  try {
    const response = await hasLikedPost(postId, user.userid);
    console.log(response, " likou");

    if (response.rows.length > 0) {
      next();
      return;
    }

    res.status(400).send({ message: "You dont like this post" });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export {
  isAvaiableToDelete,
  isAvaiableToEdit,
  hasDescription,
  isAvaiableToRepost,
  idIsValid,
  queryIsValid,
  isPostValid,
  postIsLiked,
  postIsavableToDeslike,
};
