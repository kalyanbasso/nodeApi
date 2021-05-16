module.exports = app => {

    const controller = app.controllers.prioridade;

    app.route('/prioridade')
        .post(            
            controller.addPrioridade            
        )
        .get(
            controller.getAllPrioridade
        );
    
    app.route('/prioridade/:id')
        .get(
            controller.getPrioridadeById
        )
        .put(
            controller.editPrioridade
        )
        .delete(
            controller.deletePrioridade
        )
}