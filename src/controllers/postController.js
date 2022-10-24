import * as postRepository from "../repositories/postRepository.js";
import {
  badRequestResponse,
  okResponse,
  serverErrorResponse,
} from "./controllerHelper.js";

import {
  listHashtag,
  insertHashtag,
  listPostCreated,
  insertHashtagPost,
} from "../repositories/posts.repositories.js";

async function createPost(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  const { link, text } = req.body;

  const user = res.locals.user;

  console.log(text, " text");

  const array = text.trim().split(" ");

  console.log(array, " array hashtags");

  const listWithOutHashtag = array.map((value) => {
    if (value[0] === "#") {
      return "$#";
    }
    return value;
  });

  console.log(listWithOutHashtag, " sem #");

  const listaDeHashtag = array.filter((value) => {
    if (value[0] === "#") {
      return value.substring(1);
    }
  });

  const listInsertHashtag = listaDeHashtag.map((value) => {
    if (value[0] === "#") {
      return value.substring(1);
    }
  });

  console.log(listaDeHashtag, " listaDeHashtag");

  console.log(listInsertHashtag, " insert");

  const textJoin = listWithOutHashtag.join(" ");

  console.log(textJoin);

  try {
    const response = await postRepository.insertPost({
      link,
      text: textJoin,
      userId: user.userid,
    });

    const findPost = await listPostCreated(user.userid, textJoin);

    console.log(findPost, " findpost");

    listInsertHashtag.map((value) => {
      insertHashtag(value).then((item) => {
        listHashtag(value).then((itemSerach) => {
          console.log(itemSerach.rows[0]);
          insertHashtagPost(findPost.rows[0].id, itemSerach.rows[0].id);
        });
      });
    });

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export { createPost };
