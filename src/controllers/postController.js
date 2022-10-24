import * as postRepository from "../repositories/postRepository.js";
import * as authRepository from "../repositories/auth.repositories.js";
import {
  badRequestResponse,
  okResponse,
  serverErrorResponse,
} from "./controllerHelper.js";

async function createPost(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const uId = await postRepository.getUserIdByToken(token);
  const { link, text } = req.body;

  try {
    if (!uId.userid) {
      res.status(400).send("Nao deu");
    }
    if (!link) {
      return badRequestResponse(res);
    }
    const result = await postRepository.insertPost({
      link,
      text,
      userId: uId.userid,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function beLiked(req, res) {
  const user = res.locals.user;
  const userid = user.userid;
  const { postid } = req.body;
  try {
    if ((await authRepository.searchALike(userid, postid)).length === 0) {
      authRepository.insertLikes(userid, postid);
    } else {
      authRepository.deleteLikes(userid, postid);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
export { createPost, beLiked };
