import * as postRepository from "../repositories/postRepository.js";
import { badRequestResponse, okResponse, serverErrorResponse } from "./controllerHelper.js";

async function createPost(req, res) {
  const { link, text } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  const uId = await postRepository.getUserIdByToken(token);

  try {
  
    if (!uId.userid)
      badRequestResponse(res, "Token Inválido!");
    if (!link) badRequestResponse(res, "Houve um erro ao publicar o seu link");
    const result = await postRepository.insertPost({
      link,
      text,
      userId: uId.userid,
    });
  
      okResponse(res, "Criado com sucesso!");
  
  } catch (error) {
    console.error(error);
    serverErrorResponse(res, "Erro de servidor");
  }
}

export { createPost };
