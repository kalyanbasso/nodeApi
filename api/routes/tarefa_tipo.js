module.exports = app => {

    const controller = app.controllers.tarefa_tipo;

    app.route('/tarefa_tipo')
        .get(            
            controller.getAllTaskType            
        ) 
        .post(
            controller.addTaskType
        )
    
    app.route('/tarefa_tipo/:id')
        .get(
            controller.getTaskTypeById
        )
        .delete(
            controller.deleteTaskType
        )
        .put(
            controller.editTaskType
        )
}