module.exports = app => {
    
    const controller = {};

    controller.addTask = function(req, res){        
        const { titulo, descricao, id_projeto, id_dev, tempo_estimado, data_inicio, 
            data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, data_inicio_dev, data_fim_dev, 
            created_at, updated_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo 
        } = req.body
        const id_criador = req.userId
        const values = [
            titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, data_inicio, 
            data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, data_inicio_dev, data_fim_dev, 
            created_at, updated_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo 
        ]

        app.db.none('INSERT INTO tarefa (titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, data_inicio, '+
        ' data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, data_inicio_dev, data_fim_dev, '+
        ' created_at, updated_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', values);

        res.status(200).json(`Tarefa inserida`);
    }

    controller.getAllTask = function(req, res, next){
        app.db.any('select tarefa.id, tarefa.titulo, tarefa.descricao, p.titulo projeto, usuario.nome usuario, id_dev, tempo_estimado, tempo_realizado, complexidade, ' +
        "TO_CHAR( tarefa.data_inicio, 'DD/MM/YYYY HH24:MI' ) data_inicio, TO_CHAR( tarefa.data_fim, 'DD/MM/YYYY HH24:MI' ) data_fim, " +
               'p2.descricao prioridade ' +
        'from tarefa join projeto p on tarefa.id_projeto = p.id join usuario on usuario.id_usuario = tarefa.id_criador ' +
        'join prioridade p2 on tarefa.id_prioridade = p2.id')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Todos as tarefas'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.getTaskById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM tarefa WHERE id = $1', id)
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

    controller.deleteTask = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM tarefa WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Tarefa deletada'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editTask  = function(req, res){
        const { titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, data_inicio, 
            data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, data_inicio_dev, data_fim_dev, 
            created_at, updated_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo 
        } = req.body

        const id = parseInt(req.params.id); 

        app.db.none('update tarefa set titulo = $1, descricao = $2, id_projeto = $3, id_criador = $4, id_dev = $5, tempo_estimado = $6, data_inicio= $7, '+
        ' data_fim = $8, id_pai_tarefa = $9, id_tipo_tarefa = $10, id_status_tarefa = $11, data_inicio_dev= $12, data_fim_dev= $13, '+ 
        ' created_at = $14, updated_at = $15, tempo_realizado = $16, authorized = $17, id_prioridade = $18, complexidade = $19, impacto = $20 , id_grupo = $21 '+
        ' where id = $22', [
            titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, data_inicio, 
            data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, data_inicio_dev, data_fim_dev, 
            created_at, updated_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo, id
        ]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}