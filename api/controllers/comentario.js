module.exports = app => {
    
    const controller = {};

    controller.addComentario = function(req, res){        
        const { id_tarefa, id_usuario, descricao, id_pai_comentario } = req.body

        const values = [id_tarefa, id_usuario, descricao, id_pai_comentario]
        app.db.none('INSERT INTO comentario (id_usuario, id_tarefa, descricao, created_at, updated_at, id_pai_comentario) VALUES($2, $1, $3, now(), now(), $4)', values);

        res.status(200).json(`Comentario inserido`);
    }

    controller.getAllComentario = function(req, res, next){
        app.db.any('SELECT c.id, t.titulo, c.descricao, comentario.descricao descricao_pai FROM comentario c join tarefa t on t.id = c.id_tarefa  join comentario on c.id_pai_comentario = comentario.id')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos os comentarios'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getComentarioById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM comentario WHERE id = $1', id)
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

    controller.deleteComentario = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM comentario WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Comentario deletado'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editComentario  = function(req, res){
        const { descricao  } = req.body
       
        const id = parseInt(req.params.id); 

        app.db.none('update comentario set descricao = $1, updated_at = now() where id = $2', [descricao, id]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}