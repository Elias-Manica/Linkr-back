import connection from "../database/database.js";

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

export { getUserByEmail, getUserById, insertUser, deleteSession, insertSession, getSessionByToken };