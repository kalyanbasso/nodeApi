module.exports = app => {

    const controller = app.controllers.comentario;

    app.route('/comentario')
        .get(            
            controller.getAllComentario            
        ) 
        .post(
            controller.addComentario
        )
    
    app.route('/comentario/:id')
        .get(
            controller.getComentarioById
        )
        .delete(
            controller.deleteComentario
        )
        .put(
            controller.editComentario
        )
}