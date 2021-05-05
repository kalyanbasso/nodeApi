module.exports = app => {

    const veiculo = app.data.veiculo;
    
    const controller = {};

    controller.addVeiculo = function(req, res){
        
        console.log(req);
        
        const marca = req.body.marca;
        const modelo = req.body.modelo;
        const ano = req.body.ano;

        const veiculo = req.body.veiculo;

        console.log(req);

        app.db.none(`INSERT INTO veiculos (marca, modelo, ano) VALUES ('${marca}', '${modelo}', ${ano})`);

        res.status(200).json(veiculo);
    }

    controller.getAllVeiculo = function(req, res, next){
        
        if(req.query.id){
            controller.getVeiculoById(req, res, next)
        } else {
            app.db.any('SELECT * FROM veiculos')
                .then(data => {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: data,
                            message: 'Todos os veiculos'
                        });
                })
            .catch(function (err){
                return next(err);
            });
        }
    }

    controller.getVeiculoById = function(req, res, next){
        
        // console.log(req);

        var id = parseInt(req.query.id);

        app.db.any('SELECT * FROM veiculos WHERE id = $1', id)
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
    
    return controller;
}