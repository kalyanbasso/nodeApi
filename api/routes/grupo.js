module.exports = app => {

    const controller = app.controllers.grupo;

    app.route('/grupo')
        .get(            
            controller.getAllGrupo            
        ) 
        .post(
            controller.addGrupo
        )
    
    app.route('/grupo/:id')
        .get(
            controller.getGrupoById
        )
        .delete(
            controller.deleteGrupo
        )
        // .put(
        //     controller.editComentario
        // )
}