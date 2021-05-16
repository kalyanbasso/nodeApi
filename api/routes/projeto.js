module.exports = app => {

    const controller = app.controllers.projeto;

    app.route('/projeto')
        .post(            
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
            controller.editProjeto
        )
        .delete(
            controller.deleteProjeto
        )
}