module.exports = app => {
    
    const controller = {};

    controller.addProjeto = async function(req, res, next){
        const titulo = req.body.titulo
        const descricao = req.body.descricao
        const id_criador = req.userId
        const id_sistema = req.body.id_sistema
        const data_inicio = req.body.data_inicio
        const data_fim = req.body.data_fim

        response = await app.db.any('SELECT * FROM sistema WHERE id_sistema = $1', id_sistema)
        .catch(function (err){
            return next(err);
        });

        if(response.length === 0){
            res.status(404).json('Sistema nao encontrado');
            return next()
        }
        const values = [
            titulo, descricao, data_inicio,
            data_fim, id_criador, id_sistema
        ]
        app.db.none("insert into projeto (titulo, descricao, data_inicio, "+
            " data_fim, id_criador, id_sistema, created_at, updated_at) "+
            " values ($1, $2, $3, $4, $5, $6, now(), now()) ", values);

        res.status(200).json(`Projeto ${titulo} criado com sucesso!`);
    }

    controller.getAllProjeto = function(req, res, next){
        app.db.any('SELECT * FROM projeto')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos os projeto'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getProjetoById = function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any("select *, TO_CHAR( data_inicio, 'YYYY-MM-DD' ) dt_ini, TO_CHAR( data_fim, 'YYYY-MM-DD' ) dt_fim from projeto  WHERE id = $1", id)
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

    controller.deleteProjeto = function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM projeto WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Projeto Deletado'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editProjeto  = async function(req, res, next){
        const titulo = req.body.titulo
        const descricao = req.body.descricao
        const id_sistema = req.body.id_sistema
        const data_inicio = req.body.data_inicio
        const data_fim = req.body.data_fim
        const id = req.params.id
        response = await app.db.any('SELECT * FROM sistema WHERE id_sistema = $1', id_sistema)
        .catch(function (err){
            return next(err);
        });

        if(response.length === 0){
            res.status(404).json('Sistema nao encontrado');
            return next()
        }

        const values = [
            titulo, descricao, data_inicio,
            data_fim, id_sistema, id
        ]

        app.db.none('UPDATE projeto SET titulo = $1, descricao = $2, data_inicio = $3, ' +
            ' data_fim = $4, id_sistema = $5, updated_at = now() WHERE id = $6', values);

        res.status(200).json(`Projeto ${titulo} editado com sucesso!`);
    }
    
    return controller;
}