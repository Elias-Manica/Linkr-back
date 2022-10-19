import connection from "../database/database.js";

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function insertUser(email, password, username, pictureurl) {
    return connection.query(
        `INSERT INTO users (email, password, username, pictureurl) VALUES ($1, $2, $3, $4);`, 
        [email, password, username, pictureurl]);
}

export { getUserByEmail, insertUser };