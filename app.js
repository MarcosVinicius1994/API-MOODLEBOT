const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaUsers = require('./routes/users');
const rotaDisciplinas = require('./routes/disciplinas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/produtos', rotaProdutos);
app.use('/users', rotaUsers);
app.use('/disciplinas', rotaDisciplinas);
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