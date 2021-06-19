module.exports = app => {

    const controller = app.controllers.login;

    app.route('/login')
        .post(            
            controller.login            
    )
}