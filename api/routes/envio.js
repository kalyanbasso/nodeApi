module.exports = app => {
    const controller = app.controllers.envio;
    app.route('/envio')
        .post(
            controller.addPessoa
            // function(req, res){
            //     console.log(controller);
            //     res.send('teste');
            // }
        );
}