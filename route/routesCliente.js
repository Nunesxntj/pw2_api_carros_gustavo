//Importa o pacote express
const express = require('express');

//Importa a tabela de Carros
const modelCliente = require('../model/modelClientes');

//gerenciador de rotas para o express
const router = express.Router();

//rotas de crud de categoria
router.post('/cadastrarCliente', (req, res)=>{
    console.log(req.body);
    // let nome_categoria = req.body.nome_categoria;
    let {nome_cliente,id_cliente,cpf,sexo,telefone,email,endereco} = req.body;
    modelCliente.create(
        //DADOS DA INSERÇÂO
        {nome_cliente,id_cliente,cpf,sexo,telefone,email,endereco}
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE INSERIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO INSERIR O CLIENTE.",
                errorObject:error
            });
        }
    );
});

//ROTA DE LISTAGEM DE CATEGORIA SEM CRITÉRIO
router.get('/listarCliente', (req, res)=>{

    modelCliente.findAll()
        .then(
            (response)=>{
                //console.log(response);
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"CLIENTE LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTAR OS CLIENTES.",
                    errorObject:error
                });
            }
        );

});

//ROTA DE LISTAGEM DE CATEGORIA POR COD_CATEGORIA
router.get('/listarClientePK/:id_cliente', (req, res)=>{

    //DECLARAR E RECEBER O DADO DE CODIGO DE CATEGORIA
    let {id_cliente} = req.params;

    //AÇÃO DE SELEÇÃO DE DADOS DO SEQUELIZE
    modelCliente.findByPk(id_cliente)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR OS CLIENTES.",
                errorObject:error
            });
        }
    )

});

//ROTA DE LISTAGEM DE CATEGORIA POR NOME_CATEGORIA
router.get('/listarClienteNOME/:nome_cliente', (req, res)=>{

    let {nome_cliente} = req.params;

    modelCliente.findOne(
        {
            attributes:['id_cliente',"cpf","sexo","email","telefone","endereco"],
            where:{nome_cliente}
        }
        ).then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O CLIENTE.",
                errorObject:error
            });
        }
    )

});

//ROTA DE ALTERAÇÃO DE CATEGORIA
router.put('/alterarCliente', (req, res)=>{

    // const cod_categoria = req.body.cod_categoria;
    // const nome_categoria = req.body.nome_categoria;
    const {nome_cliente,id_cliente,cpf,sexo,telefone,email,endereco} = req.body;

    modelCliente.update(
        {nome_cliente,id_cliente,cpf,sexo,telefone,email,endereco},
        {where:{id_cliente}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE ALTERADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO ALTERAR O CLIENTE.",
                errorObject:error
            });
        }
    );
    
});

//ROTA DE EXCLUSÃO DE CATEGORIA
router.delete('/excluirCliente/:id_cliente', (req, res)=>{
    console.log(req.params);
    let {id_cliente} = req.params

    modelCliente.destroy(
        {where:{id_cliente}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE EXCLUIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR CLIENTE.",
                errorObject:error
            });
        }
    );
});

module.exports = router;