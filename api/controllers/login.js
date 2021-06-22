const jwt = require("jsonwebtoken");

module.exports = app => {
    
    const controller = {};
    

    controller.login = async function(req, res){
        
        const username = req.body.username
        const response = await app.db.any('SELECT * FROM usuario WHERE nome = $1', username)
        if(response.length !== 0) {
            const id_usuario = response[0].id_usuario
            const token = jwt.sign({userId: id_usuario}, process.env.SECRET, {expiresIn: 30000})
            return res.json({auth: true, token})
        }
        res.status(401).end();
    }

    return controller;
}