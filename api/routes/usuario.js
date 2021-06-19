const { verifyJWT } = require("../helper/security");

module.exports = app => {

    const controller = app.controllers.usuario;

    app.route('/usuario')
        .post(            
            controller.addUsuario            
        )
        .get(
            verifyJWT,
            controller.getAllUsuario
        );
    
    app.route('/usuario/:id')
        .get(
            controller.getUsuarioById
        )
        .put(
            controller.editUsuario
        )
        .delete(
            controller.deleteUsuario
        )
}