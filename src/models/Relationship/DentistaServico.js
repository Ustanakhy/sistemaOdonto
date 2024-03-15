const mongoose = require('mongoose');

// Defina o esquema para DentistaServico
const DentistaServicoSchema = new mongoose.Schema({
  dentistaId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  ServicoId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  Status: {
    type: String,
    enum: ['A', 'I', 'Excluido'], // Definir os valores do enum
    default: 'A',
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now // Definir o valor padrão como a data/hora atual
  }
});

// Criar o modelo DentistaServico com base no esquema
const DentistaServico = mongoose.model('DentistaServico', DentistaServicoSchema);

module.exports = DentistaServico;
