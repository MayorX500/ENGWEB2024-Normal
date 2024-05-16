var express = require('express');
var router = express.Router();
var axios = require('axios');

/*
- [ ] Página principal `http://localhost:16001/`
    - [ ] Cabeçalho com metainformação à escolha;
    - [ ] Tabela com a lista de `contratos`, um por linha, com os campos: idcontrato, objectoContrato, dataCelebracaoContrato, precoContratual,NIPC_entidade_comunicante, entidade_comunicante;
        - [ ] O campo idcontrato deverá ser um link para a página do contrato com esse identificador;
        - [ ] O campo NIPC_entidade_comunicante deverá ser um link para a página dessa entidade.
- [ ] Página de contrato `http://localhost:16001/:idcontrato`
    - [ ] Todos os campos do contrato;
    - [ ] Link para voltar à página principal.
- [ ] Página de entidade `http://localhost:16001/entidades/:nipc`
    - [ ] Identificador e nome da entidade;
    - [ ] Tabela com a lista de contratos dessa entidade;
    - [ ] Somatório do valor dos contratos;
    - [ ] Link para voltar à página principal.
*/


router.get('/', async (req, res) => {
  try {
    const contratos = await axios.get('http://localhost:16000/contratos');
    res.render('index', { data: contratos.data, title: 'Contratos' });
  } catch (err) {
    res.status
  }
});


router.get('/:idcontrato', async (req, res) => {
  try {
    const contrato = await axios.get(`http://localhost:16000/contratos/${req.params.idcontrato}`);
    res.render('contract', { contrato: contrato.data, title: 'Contrato' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/entidades/:nipc', async (req, res) => {
  try {
    const entidade = await axios.get(`http://localhost:16000/contratos/filtered?nipc=${req.params.nipc}`);
    let entidadeData = {
      nipc: req.params.nipc,
      nome: entidade.data[0].entidade_comunicante,
      contratos: entidade.data
    }
    res.render('entity', { entity: entidadeData, title: 'Entidade' });
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = router;
