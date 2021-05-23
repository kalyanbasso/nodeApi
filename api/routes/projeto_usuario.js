module.exports = app => {

    const controller = app.controllers.projeto_usuario;

    app.route('/projetoUsuario')
        .get(            
            controller.getAllProjects            
        ) 
        .post(
            controller.addProject
        )
    
    app.route('/projetoUsuario/:id')
        .get(
            controller.getProjectById
        )
        .delete(
            controller.deleteProjectUser
        )
        .put(
            controller.editProjectUser
        )
}