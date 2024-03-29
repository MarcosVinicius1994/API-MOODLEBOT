const express = require ('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/:name_user', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({ error: error});
        }
            conn.query(
                `SELECT c.fullname 
                FROM mdl_user u
                INNER JOIN mdl_user_enrolments ue ON ue.userid = u.id
                INNER JOIN mdl_enrol e ON e.id = ue.enrolid
                INNER JOIN mdl_course c ON e.courseid = c.id
                WHERE c.fullname != 'New Site' and u.username = ?;`,
                [req.params.name_user],
                (error, resultado, fields) => {
                    if(error){
                        return res.status(500).send({ error: error});
                    }
                    // delete resultado[0];
                    res.status(200).send({Response: resultado})
                }
            )
    });
});

router.post('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o POST dentro da rota de usuarios'
    });
});

module.exports = router;