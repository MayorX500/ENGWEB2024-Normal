var express = require('express');
var router = express.Router();
const contratoController = require('../controllers/contrato');

/*
GET /contratos: devolve uma lista com todos os registos;
GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);
GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade
EEEE;
GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada
alfabeticamente e sem repetições;
GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e
sem repetições;
POST /contratos: acrescenta um registo novo à BD;
DELETE /contratos/:id: elimina da BD o registo com o identificador id;
PUT /contratos/:id: altera o registo com o identificador id.
*/


// GET requests
router.get('/', async (req, res) => {
try {
    const contratos = await contratoController.getContracts(req.query);
    res.json(contratos);
} catch (err) {
    res.status(500).send(err);
}
});

router.get('/filtered', async (req, res) => {
    try {
        const contratos = await contratoController.getWithFilter(req.query);
        res.json(contratos);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/entidades', async (req, res) => {
    try {
        const entidades = await contratoController.getEntidades();
        res.json(entidades);
    } catch (err) {
        res.status(500).send(err);
    }
});
    
    router.get('/tipos', async (req, res) => {
    try {
        const tipos = await contratoController.getTipos();
        res.json(tipos);
    } catch (err) {
        res.status(500).send(err);
    }
});



router.get('/:id', async (req, res) => {
try {
    const contrato = await contratoController.getContract(req.params.id);
    res.json(contrato);
} catch (err) {
    res.status(500).send(err);
}
});

// POST request
router.post('/', async (req, res) => {
try {
    const contrato = await contratoController.createContract(req.body);
    res.status(201).json(contrato);
} catch (err) {
    res.status(500).send(err);
}
});

// DELETE request
router.delete('/:id', async (req, res) => {
try {
    const result = await contratoController.deleteContract(req.params.id);
    if (result.deletedCount === 0) {
    return res.status(404).send('No contract found with that ID');
    }
    res.status(204).send();  // No content to send back
} catch (err) {
    res.status(500).send(err);
}
});

// PUT request
router.put('/:id', async (req, res) => {
try {
    const contrato = await contratoController.updateContract(req.params.id, req.body);
    if (!contrato) {
    return res.status(404).send('No contract found with that ID');
    }
    res.json(contrato);
} catch (err) {
    res.status(500).send(err);
}
});

module.exports = router;