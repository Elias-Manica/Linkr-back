import {
  badRequestResponse,
  serverErrorResponse,
} from "../controllers/helper.controllers.js";

import { getRepostByIds, listPostBasedOnId } from "../repositories/posts.repositories.js";

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

export { isAvaiableToDelete, isAvaiableToEdit, isAvaiableToRepost, hasDescription, idIsValid };
