module.exports = app => {

    const controller = app.controllers.tarefa;

    app.route('/tarefa')
        .get(            
            controller.getAllTask            
        ) 
        .post(
            controller.addTask
        )
    
    app.route('/tarefa/:id')
        .get(
            controller.getTaskById
        )
        .delete(
            controller.deleteTask
        )
        .put(
            controller.editTask
        )
}