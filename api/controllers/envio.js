// const pgp = require('pg-promise');
// const pgp 	  = require('pg-promise')({})
module.exports = app => {

    const estudante = app.data.pessoa;
    // const estudante = require('../data/pessoa.json');
    const controller = {};

    controller.addPessoa = function(req, res){
        

        // console.log(req.body);
        const name = req.body.name;
        const estudante = req.body.estudante;
        app.db.none(`INSERT INTO pessoa VALUES ('${name}', ${estudante})`);
        // const stmt = db.prepare("INSERT INTO pessoa VALUES (?, ?)");
        // stmt.run(name, estudante);
        // stmt.finalize();
        res.status(200).json(req.body);
    }

    return controller;
}