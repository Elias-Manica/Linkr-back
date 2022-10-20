const STATUS_CODE = Object.freeze({
    OK: 200, 
    CREATED: 201, 
    MOVED_PERMANENTLY: 301, 
    UNAUTHORIZED: 401, 
    NOT_FOUND: 404, 
    CONFLICT: 409, 
    UNPROCESSABLE_ENTITY: 422, 
    SERVER_ERROR: 500
});

const STATUS_TEXT = Object.freeze({
    OK: "Ok", 
    CREATED: "Created", 
    MOVED_PERMANENTLY: "Moved Permanently", 
    UNAUTHORIZED: "Unauthorized", 
    NOT_FOUND: "Not Found",
    CONFLICT: "Conflict", 
    UNPROCESSABLE_ENTITY: "Unprocessable Entity", 
    SERVER_ERROR: "Internal Server Error"
  });

function validationSchema(res, schema, body) {
    const validation = schema.validate(body, { abortEarly: false });

    if(validation.error) {
        const errorList = validation.error.details.map(error => error.message);
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errorList);
    }
}

function okResponse(res, text = STATUS_TEXT.OK) {
    return res.status(STATUS_CODE.OK).send(text);
}

function createdResponse(res, text = STATUS_TEXT.CREATED) {
    return res.status(STATUS_CODE.CREATED).send(text);
}

function movedPermanentlyResponse(res, text = STATUS_TEXT.MOVED_PERMANENTLY) {
    return res.status(STATUS_CODE.MOVED_PERMANENTLY).send(text);
}

function unauthorizedResponse(res, text = STATUS_TEXT.UNAUTHORIZED) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send(text);
}

function notFoundResponse(res, text = STATUS_TEXT.NOT_FOUND) {
    return res.status(STATUS_CODE.NOT_FOUND).send(text);
}

function conflictResponse(res, text = STATUS_TEXT.CONFLICT) {
    return res.status(STATUS_CODE.CONFLICT).send(text);
}

function unprocessableEntityResponse(res, text = STATUS_TEXT.UNPROCESSABLE_ENTITY) {
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(text);
}

function serverErrorResponse(res, error, text = STATUS_TEXT.SERVER_ERROR) {
    console.error(error);
    return res.status(STATUS_CODE.SERVER_ERROR).send(text);
}

export { 
    validationSchema, 
    okResponse, 
    createdResponse, 
    movedPermanentlyResponse, 
    unauthorizedResponse, 
    notFoundResponse, 
    conflictResponse, 
    unprocessableEntityResponse, 
    serverErrorResponse
};