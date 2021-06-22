module.exports = app => {
    
    const controller = {};

    controller.addProject = function(req, res){        
        const req_user = req.body.id_usuario
        const id_projeto = req.body.id_projeto;

        let id_usuarios = []

        req_user.forEach(element => {
            const value = Object.values(element)
            id_usuarios.push(value[0])
        });

        if(id_usuarios.length === 0){
            res.status(404).json('ID de usuário não encontrado');
            return next()
        }
        const values = [id_projeto, id_usuarios]

        app.db.none('INSERT INTO projeto_usuario (id_projeto, id_usuario) VALUES($1, $2)', values);

        res.status(200).json(`Projeto inserido para os usuários`);
    }

    controller.getAllProjects = function(req, res, next){
        app.db.any('SELECT projeto_usuario.id, p.titulo, u.nome FROM projeto_usuario left join projeto p on projeto_usuario.id_projeto = p.id left join usuario u on projeto_usuario.id_usuario = u.id_usuario')
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

    controller.getProjectById = function(req, res, next){
        const id = parseInt(req.params.id);
        app.db.any('SELECT * FROM projeto_usuario WHERE id_projeto = $1', id)
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

    controller.deleteProjectUser = async function(req, res, next){
        const id = parseInt(req.params.id);

        app.db.any('DELETE FROM projeto_usuario WHERE id = $1', id)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Projeto e usuario desvinculados'
                    });
            })
        .catch(function (err){
            return next(err);
        });
    }

    controller.editProjectUser  = function(req, res){
        const req_user = req.body.id_usuario
        const id_projeto = req.body.id_projeto;
        const id = parseInt(req.params.id); 

        let id_usuarios = []

        req_user.forEach(element => {
            const value = Object.values(element)
            id_usuarios.push(value[0])
        });

        if(id_usuarios.length === 0){
            res.status(404).json('ID de usuário não encontrado');
            return next()
        }
        app.db.none('update projeto_usuario set id_projeto = $1, id_usuario = $2 where id = $3', [id_projeto, id_usuario, id]);

        res.status(200).json(`Editado com sucesso!`);
    }
    
    return controller;
}