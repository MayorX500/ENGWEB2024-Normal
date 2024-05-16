var express = require('express');
var router = express.Router();
const contratoController = require('../controllers/contrato');

/*
GET /:nipc: devolve a lista de contratos da entidade com NIPC igual a nipc;
*/

router.get('/:nipc', async (req, res) => {
    try {
        const contratos = await contratoController.getContracts({ entidade: req.params.nipc });
        res.json(contratos);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;