module.exports = app => {

    const controller = app.controllers.sistema;

    app.route('/sistema')
        .post(            
            controller.addSistema            
        )
        .get(
            controller.getAllSistema
        );
    
    app.route('/sistema/:id')
        .get(
            controller.getSistemaById
        )
        .put(
            controller.editSistema
        )
        .delete(
            controller.deleteSistema
        )
}