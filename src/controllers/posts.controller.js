import {
  createdResponse,
  okResponse,
  serverErrorResponse,
} from "./helper.controllers.js";

import {
  listPosts,
  listHashtags,
  listPostsBasedOnNameHashtag,
  deletePostsBasedOnId,
  deletelikesBasedOnPostid,
  deleteHashtagBasedOnPostid,
  insertLikeInPosts,
  deleteLikeInPosts,
  insertHashtag,
  insertHashtagPost,
  editPost,
  listHashtagBasedOnName,
  listNameHashtag,
  insertComment,
  listComment,
  insertRepost,
  deleteCommentsBasedOnPostid,
  deleteRepostsBasedOnPostid,
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

    await deleteCommentsBasedOnPostid(id);

    await deleteRepostsBasedOnPostid(id);

    await deletePostsBasedOnId(id);

    res.sendStatus(204);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function rePost(req, res) {
  const id = res.locals.postid;
  const { userid } = res.locals.user;

  try {
    await insertRepost(id, userid);

    return createdResponse(res);

  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function likeAPost(req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    await insertLikeInPosts(userId, postId);

    return createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function dislikeAPost(req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    await deleteLikeInPosts(userId, postId);

    return okResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function editPostFunction(req, res) {
  try {
    const infosPosts = res.locals.post;

    const { link, text } = req.body;

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
    console.log(infosPosts);

    await deleteHashtagBasedOnPostid(infosPosts.id);

    console.log(infosPosts, " infopost");
    console.log(textJoin, " textjoin");

    await editPost(textJoin, infosPosts.id);

    listInsertHashtag.map((value) => {
      insertHashtag(value).then((item) => {
        listHashtagBasedOnName(value).then((itemSerach) => {
          if (itemSerach.rows.length > 0) {
            console.log(value, " value");
            insertHashtagPost(infosPosts.id, itemSerach.rows[0].id);
          } else {
            listNameHashtag(value).then((name) => {
              console.log(value, " value dentro");
              insertHashtagPost(infosPosts.id, name.rows[0].id);
            });
          }
        });
      });
    });
    res.sendStatus(200);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function commentAPost(req, res) {
  try {
    const { postId } = req.params;
    const { description } = req.body;
    const user = res.locals.user;

    await insertComment(postId, user.userid, description);
    return createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function listCommentPost(req, res) {
  const { postId } = req.params;

  try {
    const response = await listComment(postId);

    console.log(response);

    if (response.rows.length == 0) {
      res.status(200).send(response.rows);
      return;
    }

    if (response.rows[0].comments[0].userid === null) {
      res.status(200).send([]);
      return;
    }

    res.status(200).send(response.rows[0].comments);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export {
  listTimeline,
  listHashtagsFunction,
  listPostsBasedOnHashtag,
  deletePost, 
  rePost, 
  likeAPost,
  dislikeAPost,
  editPost,
  editPostFunction,
  commentAPost,
  listCommentPost,
};
