import { connection } from "../database/database.js";

async function getUserIdByToken(token){
  const all = await connection.query(
    `SELECT userid FROM sessions WHERE token = $1;`,[token] 
  );
    return all.rows[0];
}

async function selectFields({link, text}){

    const all = await connection.query(`SELECT
    FROM posts 
    LEFT JOIN hashtags ON 
    JOIN posthashtags ON
    WHERE 
    GROUP BY posts.id;`);

    return all;
}


async function insertPost({ link, text, userId }) {
  console.log("Esse é o userId",userId)
  const result = await connection.query(
    `INSERT INTO posts (link, text, userid) VALUES ($1, $2, $3);`,
    [link, text, userId]
  );
  //{}.rows
  
  return result;
}
export { selectFields, insertPost, getUserIdByToken };