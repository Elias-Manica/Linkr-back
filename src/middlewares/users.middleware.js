import { listUsersById } from "../repositories/users.repositories.js";


function verifyIdValid(req, res, next){
    const { id } = req.params;

try {
    if(listUsersById(id).rowCount === 0){
        return res.status(404).send("NOT FOUND");
    }
    next();
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}

}

export default verifyIdValid;