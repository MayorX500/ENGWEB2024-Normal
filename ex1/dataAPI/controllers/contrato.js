const Contrato = require('../models/contrato');  // Adjust the path as needed

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

// Fetch all contracts or filter by query parameters
const getContracts = async (query) => {
  let filter = {};
  if (query.entidade) {
    filter.entidade_comunicante = query.entidade;
  }
  if (query.tipo) {
    filter.tipoprocedimento = query.tipo;
  }
  return Contrato.find(filter).exec();
}

const getWithFilter = async (query) => {
  let filter = {};
  if (query.entidade) {
    filter.entidade_comunicante = query.entidade;
  }
  if (query.tipo) {
    filter.tipoprocedimento = query.tipo;
  }
  if (query.nipc) {
    filter.NIPC_entidade_comunicante = query.nipc;
  }
  return Contrato.find(filter).exec();
}

// Fetch a single contract by ID
const getContract = id => {
  return Contrato.findById(id).exec();
}

// Fetch a list of unique entidades, sorted alphabetically
const getEntidades = () => {
  return Contrato.distinct("entidade_comunicante").then(entidades => {
    return entidades.sort();
  });
}

// Fetch a list of unique tipos, sorted alphabetically
const getTipos = () => {
  return Contrato.distinct("tipoprocedimento").then(tipos => {
    return tipos.sort();
  });
}

// Create a new contract
const createContract = contrato => {
  return Contrato.create(contrato);
}

// Delete a contract by ID
const deleteContract = id => {
  return Contrato.findByIdAndDelete(id).exec();
}

// Update a contract by ID
const updateContract = (id, contrato) => {
  return Contrato.findByIdAndUpdate(id, contrato, { new: true }).exec();
}

// Exporting all methods
module.exports = {
  getContracts,
  getWithFilter,
  getContract,
  getEntidades,
  getTipos,
  createContract,
  deleteContract,
  updateContract
}