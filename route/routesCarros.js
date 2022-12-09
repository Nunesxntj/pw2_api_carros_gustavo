//Importa o pacote express
const express = require('express');

//Importa a tabela de Carros
const modelCarro = require('../model/modelCarros');

//gerenciador de rotas para o express
const router = express.Router();

//rotas de crud de categoria
router.post('/cadastrarCarro', (req, res)=>{
    console.log(req.body);
    // let nome_categoria = req.body.nome_categoria;
    let {nome_carro, modelo_carro} = req.body;
    modelCarro.create(
        //DADOS DA INSERÇÂO
        {nome_carro, modelo_carro}
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"CARRO INSERIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO INSERIR O CARRO.",
                errorObject:error
            });
        }
    );

    // res.send('ROTA DE CADASTRO DE CATEGORIA!');
    // console.log('TESTE DE NODEMON');

});

//ROTA DE LISTAGEM DE CATEGORIA SEM CRITÉRIO
router.get('/listarCarro', (req, res)=>{

    modelCarro.findAll()
        .then(
            (response)=>{
                //console.log(response);
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"CARROS LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTAR OS CARROS.",
                    errorObject:error
                });
            }
        );

});

//ROTA DE LISTAGEM DE CATEGORIA POR COD_CATEGORIA
router.get('/listarCarroPK/:cod_carro', (req, res)=>{

    //DECLARAR E RECEBER O DADO DE CODIGO DE CATEGORIA
    let {cod_carro} = req.params;

    //AÇÃO DE SELEÇÃO DE DADOS DO SEQUELIZE
    modelCarro.findByPk(cod_carro)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CARRO RECUPERADA COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR OS CARROS.",
                errorObject:error
            });
        }
    )

});

//ROTA DE LISTAGEM DE CATEGORIA POR NOME_CATEGORIA
router.get('/listarCarroNOME/:nome_carro', (req, res)=>{

    let {nome_carro, modelo_carro, cod_carro} = req.params;

    modelCarro.findOne({attributes:['cod_carro', 'nome_carro', 'modelo_carro'],where:{nome_carro}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CARRO RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O CARRO.",
                errorObject:error
            });
        }
    )

});

//ROTA DE ALTERAÇÃO DE CATEGORIA
router.put('/alterarCarro', (req, res)=>{

    // const cod_categoria = req.body.cod_categoria;
    // const nome_categoria = req.body.nome_categoria;
    const {cod_carro, nome_carro, modelo_carro} = req.body;

    modelCarro.update(
        {nome_carro, modelo_carro},
        {where:{cod_carro}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CARRO ALTERADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO ALTERAR O CARRO.",
                errorObject:error
            });
        }
    );
    
});

//ROTA DE EXCLUSÃO DE CATEGORIA
router.delete('/excluirCarro/:cod_carro', (req, res)=>{
    console.log(req.params);
    let {cod_carro} = req.params

    modelCarro.destroy(
        {where:{cod_carro}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CARRO EXCLUIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR CARRO.",
                errorObject:error
            });
        }
    );
});

module.exports = router;
