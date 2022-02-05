const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaUsers = require('./routes/users');
const rotaDisciplinas = require('./routes/disciplinas');
const rotaNotas = require('./routes/notas')
const rotaTarefas = require('./routes/tarefasUsuario')
const rotaTarefasDisc = require('./routes/tarefasDisciplinasUsusario')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', rotaUsers);
app.use('/disciplinas', rotaDisciplinas);
app.use('/notas', rotaNotas);
app.use('/tarUsuario', rotaTarefas);
app.use('/tarUsuDiscip', rotaTarefasDisc);
app.use( (req, res, next) =>{
    res.status(200).send({
        mensagem: 'OK, deu certo'
    });
});
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        mensagem: error.message
    });
});

module.exports = app;

//Join scared-village
//Join dangerous-cage