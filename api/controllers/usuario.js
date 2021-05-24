module.exports = app => {
    
    const controller = {};

    controller.addUsuario = function(req, res){        
        const nome = req.body.nome

        app.db.none('INSERT INTO usuario (nome) VALUES ($1)', nome);

        res.status(200).json(`Usuario ${nome} criado com sucesso!`);
    }

    controller.getAllUsuario = function(req, res, next){
        app.db.any('SELECT * FROM usuario')
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

    controller.getUsuarioById = function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('SELECT * FROM usuario WHERE id_usuario = $1', id)
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

    controller.deleteUsuario = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM usuario WHERE id_usuario = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Usuario Deletado'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editUsuario  = function(req, res){
        const nome = req.body.nome
        const id = req.params.id
        
        app.db.none('update usuario set nome = $1 where id_usuario = $2', [nome, id]);

        res.status(200).json(`Usuario ${nome} editada com sucesso!`);
    }
    
    return controller;
}