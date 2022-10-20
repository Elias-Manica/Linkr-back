import { serverErrorResponse } from "./helper.controllers.js";

async function listTimeline(req, res) {
  try {
    const response = res.locals.responseReverse;

    res.status(200).send(response);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export { listTimeline };
