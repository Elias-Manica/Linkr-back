const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
})
function badRequestResponse(res, text = 'Houve um erro ao publicar seu link'){
    return res.status(STATUS_CODE.BAD_REQUEST).send(text);
}

function okResponse(res, text = 'Criado com sucesso!'){
    return res.status(STATUS_CODE.OK).send(text);
}

function serverErrorResponse(res, text = 'Erro de servidor'){
    return res.status(STATUS_CODE.SERVER_ERROR).send(text);
}

export { badRequestResponse, okResponse, serverErrorResponse };