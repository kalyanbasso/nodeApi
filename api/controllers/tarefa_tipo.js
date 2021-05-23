module.exports = app => {
    
    const controller = {};

    controller.addTaskType = function(req, res){        
        const { descricao } = req.body

        app.db.none('INSERT INTO tarefa_tipo (descricao) VALUES($1)', descricao);

        res.status(200).json(`Tarefa inserida`);
    }

    controller.getAllTaskType = function(req, res, next){
        app.db.any('select * from tarefa_tipo')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos as usuarios'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getTaskTypeById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM tarefa_tipo WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data                        
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.deleteTaskType = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM tarefa_tipo WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Grupo deletado'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editTaskType  = function(req, res){
        const { descricao } = req.body

        const id = parseInt(req.params.id); 

        app.db.none('update tarefa_tipo set descricao = $1 where id = $2', [descricao, id]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}