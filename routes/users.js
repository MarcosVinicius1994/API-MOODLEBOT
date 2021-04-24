const express = require ('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({ error: error});
        }
            conn.query(
                'SELECT firstname, email FROM mdl_user;',
                (error, resultado, fields) => {
                    // console.log("passeiaqui!");
                    if(error){
                        return res.status(500).send({ error: error});
                    }
                    // resultado = r.map((r) =>{
                    //     if(r.fullname =="New Site"){
                    //         delete r[0];
                    //     }
                    // });
                    delete resultado[0];
                    res.status(200).send({Response: resultado})
                }
            )
    });
    // res.status(200).send({
    //     mensagem: 'Usando o GET dentro da rota de usuarios'
    // });
});

router.post('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o POST dentro da rota de usuarios'
    });
});

module.exports = router;