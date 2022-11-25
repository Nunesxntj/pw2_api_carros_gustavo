// importa o pacote do express
const express = require('express')
// importa a tabela de cliente
const modelC = require('../model/modelClientes');
//gerenciador de rotas para express

const router = express.Router();
//rotas de crud de categoria
router.post('/cadastrarClientes', (req, res)=>{
    res.send('ROTA DE CADASTRO DE CLIENTES!')
})
router.get('/listarClientes', (req, res)=>{
    res.send('ROTA DE LISTAGEM DE CLIENTES!')
})
router.put('/alterarClientes', (req, res)=>{
    res.send('ROTA DE ALTERAR CLIENTES!')
})
router.delete('/excluirClientes', (req, res)=>{
    res.send('ROTA DE EXCLUIR CLIENTES!')
})

//torna as rotas utilizáveis em outro arquivo
module.exports = router;