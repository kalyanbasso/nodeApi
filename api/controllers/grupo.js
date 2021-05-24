module.exports = app => {
    
    const controller = {};

    controller.addGrupo = function(req, res){        
        const { id_projeto, descricao,  } = req.body

        const values = [id_projeto, descricao]
        app.db.none('INSERT INTO grupo (id_projeto, descricao) VALUES($1, $2)', values);

        res.status(200).json(`Grupo inserido`);
    }

    controller.getAllGrupo = function(req, res, next){
        app.db.any('select * from grupo')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos os grupos'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getGrupoById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM grupo WHERE id = $1', id)
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

    controller.deleteGrupo = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM grupo WHERE id = $1', id)
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

    controller.editGrupo  = function(req, res){
        const { id_projeto, descricao,  } = req.body
        const id = parseInt(req.params.id); 

        app.db.none('update grupo set id_projeto = $1, descricao = $2 where id = $3', [id_projeto,descricao, id]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}