const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
})
function badRequestResponse(res){
    return res.status(STATUS_CODE.BAD_REQUEST).send('Houve um erro ao publicar seu link');
}

function okResponse(res){
    return res.status(STATUS_CODE.OK).send('Criado com sucesso!');
}

function serverErrorResponse(res){
    return res.status(STATUS_CODE.SERVER_ERROR).send('Erro de servidor');
}

export { badRequestResponse, okResponse, serverErrorResponse };