import {connection} from "../database/database.js";

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function getUserById(userid) {
    return connection.query(`SELECT * FROM sessions WHERE userid = $1;`, [userid]);
}

async function insertUser(email, password, username, pictureurl) {
    return connection.query(
        `INSERT INTO users (email, password, username, pictureurl) VALUES ($1, $2, $3, $4);`, 
        [email, password, username, pictureurl]
    );
}

async function deleteSession(userid) {
    return connection.query(`DELETE FROM sessions WHERE userid = $1;`, [userid]);
}

async function insertSession(token, userid) {
    return connection.query(`INSERT INTO sessions (token, userid) VALUES ($1, $2);`, [token, userid]);
}

async function getSessionByToken(token) {
    return connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
}
async function insertLikes(userid, postid){
    return connection.query(`INSERT INTO likes (userid, postid) VALUES ($1, $2);`, [userid, postid]);
}
async function deleteLikes(userid, postid){
    return connection.query(`DELETE FROM likes WHERE userid = $1 AND postid = $2;`,[userid, postid]);
}
async function searchALike(userid, postid){
    return connection.query(`SELECT postid, userid FROM likes WHERE postid = $1 AND userid = $2;`, [postid, userid])
}


export { getUserByEmail, getUserById, insertUser, deleteSession, insertSession, 
    getSessionByToken, insertLikes, deleteLikes, searchALike };