const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("Serviço rodando na porta:", port )
});
