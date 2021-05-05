module.exports = app => {

    const controller = app.controllers.veiculo;

    app.route('/veiculo')
        .post(            
            controller.addVeiculo            
        )
        .get(
            controller.getAllVeiculo
        );
    
    // app.route('/veiculo/:id')
    //     .get(
    //         controller.getVeiculoById
    //     )
    //     .post(
    //         function(req, res){
    //             res.send('teste');
    //         }
    //     )
}