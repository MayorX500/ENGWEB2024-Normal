const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  _id: Number,
  nAnuncio: { type: String, default: '' },
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: String,
  dataCelebracaoContrato: String,
  precoContratual: String,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: Number,
  entidade_comunicante: String,
  fundamentacao: String
}, { versionKey: false });

module.exports = mongoose.model('Contratos', contratoSchema);