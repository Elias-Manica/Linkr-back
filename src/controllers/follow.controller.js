import {
  followUser,
  unfollowDelete,
  verifyFollow,
} from "../repositories/users.repositories.js";

async function follow(req, res) {
  const { id } = req.params;
  const user = res.locals.user;
  //fazer middleware que verifica se existe um usuário com esse id
  try {
    await followUser(user.userid, id);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
async function unfollow(req, res) {
  const { id } = req.params;
  const user = res.locals.user;
  //fazer middleware que verifica se o usuário realmente segue esse userid
  try {
    await unfollowDelete(user.userid, id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
async function isFollowing(req, res) {
  const { id } = req.params;
  const user = res.locals.user;

  try {
    const response = await verifyFollow(user.userid, id);
    
    if (response.rowCount === 0) {
      res.status(200).send({ follow: false });
      return;
    }

    res.status(200).send({ follow: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { follow, unfollow, isFollowing };
