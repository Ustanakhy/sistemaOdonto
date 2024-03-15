const mongoose = require('mongoose');

// Defina o esquema para DentistaClinica
const DentistaClinicaSchema = new mongoose.Schema({
  ClinicaId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  dentistaId: {
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

// Criar o modelo DentistaClinica com base no esquema
const DentistaClinica = mongoose.model('DentistaClinica', DentistaClinicaSchema);

module.exports = DentistaClinica;
