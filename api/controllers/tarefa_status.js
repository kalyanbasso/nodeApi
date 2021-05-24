module.exports = app => {
    
    const controller = {};

    controller.addTaskStatus = function(req, res){        
        const { descricao } = req.body

        app.db.none('INSERT INTO tarefa_status (descricao) VALUES($1)', descricao);

        res.status(200).json(`Tarefa status inserida`);
    }

    controller.getAllTaskStatus = function(req, res, next){
        app.db.any('select * from tarefa_status')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos os status'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getTaskStatusById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM tarefa_status WHERE id = $1', id)
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

    controller.deleteTaskStatus = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM tarefa_status WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Tarefa status deletada'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editTaskStatus  = function(req, res){
        const { descricao } = req.body

        const id = parseInt(req.params.id); 

        app.db.none('update tarefa_status set descricao = $1 where id = $2', [descricao, id]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}