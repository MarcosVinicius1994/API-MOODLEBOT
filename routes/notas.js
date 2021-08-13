const express = require ('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/:name_user', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({ error: error});
        }
            conn.query(
                `SELECT 
                c.fullname,
                gi.grademax AS itemgrademax,
                g.finalgrade AS finalgrade
                FROM mdl_user u
                JOIN mdl_grade_grades g ON g.userid = u.id
                JOIN mdl_grade_items gi ON g.itemid =  gi.id
                JOIN mdl_course c ON c.id = gi.courseid
                WHERE itemname is not null 
                and g.finalgrade is not null
                and u.username = ?;`,
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




// select * from mdl_assignment;
// SELECT distinct c.fullname,
// g.finalgrade,
//        a.name,
//        a.grade,
//        FROM_UNIXTIME( a.allowsubmissionsfromdate, '%h:%i' ) AS allowsubmissionsfromhour,
//        FROM_UNIXTIME( a.allowsubmissionsfromdate, '%D,%M, %Y' ) AS allowsubmissionsfromdate,
//        FROM_UNIXTIME( a.duedate, '%D,%M, %Y' ) AS "duedate"
// FROM mdl_user u
// INNER JOIN mdl_grade_grades g ON g.userid = u.id
// INNER JOIN mdl_user_enrolments ue ON ue.userid = g.userid
// INNER JOIN mdl_enrol e ON e.id = ue.enrolid
// INNER JOIN mdl_course c ON e.courseid = c.id
// INNER JOIN mdl_assign a ON c.id = a.course
// WHERE c.fullname != 'New Site' 
// and g.finalgrade is null
// and u.username = 'marcos.nunes'