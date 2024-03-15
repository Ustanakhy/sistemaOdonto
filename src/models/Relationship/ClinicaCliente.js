const mongoose = require('mongoose');

// Defina o esquema para ClinicaCliente
const ClinicaClienteSchema = new mongoose.Schema({
  ClinicaId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    ref: 'Clinica', // Referência ao modelo de outra coleção (Clinica)
    required: true
  },
  ClienteId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    ref: 'Cliente', // Referência ao modelo de outra coleção (Cliente)
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

// Criar o modelo ClinicaCliente com base no esquema
const ClinicaCliente = mongoose.model('ClinicaCliente', ClinicaClienteSchema);

module.exports = ClinicaCliente;
