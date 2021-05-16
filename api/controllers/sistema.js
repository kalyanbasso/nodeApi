module.exports = app => {
    
    const controller = {};

    controller.addSistema = function(req, res){        
        const nome = req.body.nome

        app.db.none('INSERT INTO sistema (nome) VALUES ($1)', nome);

        res.status(200).json(`Sistema ${nome} criado com sucesso!`);
    }

    controller.getAllSistema = function(req, res, next){
        app.db.any('SELECT * FROM sistema')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos os sistemas'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getSistemaById = function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('SELECT * FROM sistema WHERE id_sistema = $1', id)
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

    controller.deleteSistema = async function(req, res, next){
        const id = parseInt(req.params.id);

        response = await app.db.any('SELECT * FROM projeto WHERE id_sistema = $1', id)
        .catch(function (err){
            return next(err);
        });

        if(response.length !== 0){
            res.status(500).json('O sistema possui Projetos vinculados');
            return next()
        }

        app.db.any('DELETE FROM sistema WHERE id_sistema = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Sistema Deletado'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editSistema  = function(req, res){
        const nome = req.body.nome
        const id = req.params.id
        
        app.db.none('update sistema set nome = $1 where id_sistema = $2', [nome, id]);

        res.status(200).json(`Sistema ${nome} editado com sucesso!`);
    }
    
    return controller;
}