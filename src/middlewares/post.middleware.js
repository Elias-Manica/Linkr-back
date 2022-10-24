import { serverErrorResponse } from "../controllers/helper.controllers.js";

import { listPostBasedOnId } from "../repositories/posts.repositories.js";

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

export { isAvaiableToDelete };
