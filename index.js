const express = require('express');

const routesCarros = require('./route/routesCarros');
const routesCliente = require('./route/routesCliente');

const app = express();

app.use(express.json());

app.use('/', routesCarros);
app.use('/', routesCliente);

app.listen(3000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:3000');
});