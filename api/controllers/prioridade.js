module.exports = app => {
    
    const controller = {};

    controller.addPrioridade = function(req, res){        
        const descricao = req.body.descricao

        app.db.none('INSERT INTO prioridade (descricao) VALUES ($1)', descricao);

        res.status(200).json(`Prioridade ${descricao} criado com sucesso!`);
    }

    controller.getAllPrioridade = function(req, res, next){
        app.db.any('SELECT * FROM prioridade')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos as prioridades'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getPrioridadeById = function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('SELECT * FROM prioridade WHERE id = $1', id)
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

    controller.deletePrioridade = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM prioridade WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Prioridade Deletada'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editPrioridade  = function(req, res){
        const descricao = req.body.descricao
        const id = req.params.id
        
        app.db.none('update prioridade set descricao = $1 where id = $2', [descricao, id]);

        res.status(200).json(`Prioridade ${descricao} editada com sucesso!`);
    }
    
    return controller;
}