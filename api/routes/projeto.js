const { verifyJWT } = require("../helper/security");

module.exports = app => {

    const controller = app.controllers.projeto;

    app.route('/projeto')
        .post(            
            verifyJWT,
            controller.addProjeto            
        )
        .get(
            controller.getAllProjeto
        );
    
    app.route('/projeto/:id')
        .get(
            controller.getProjetoById
        )
        .put(
            verifyJWT,
            controller.editProjeto
        )
        .delete(
            controller.deleteProjeto
        )
}