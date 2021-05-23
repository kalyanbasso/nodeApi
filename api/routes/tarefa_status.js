module.exports = app => {

    const controller = app.controllers.tarefa_status;

    app.route('/tarefa_status')
        .get(            
            controller.getAllTaskStatus            
        ) 
        .post(
            controller.addTaskStatus
        )
    
    app.route('/tarefa_status/:id')
        .get(
            controller.getTaskStatusById
        )
        .delete(
            controller.deleteTaskStatus
        )
        .put(
            controller.editTaskStatus
        )
}