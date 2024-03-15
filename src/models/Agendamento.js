const mongoose = require('mongoose');

// Defina o esquema para Agendamento
const AgendamentoSchema = new mongoose.Schema({
  ClinicaId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  dentistaId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  ClienteId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  ServicoId: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referenciar outro documento
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  Preco: {
    type: Number,
    required: true
  },
  comissao: {
    type: Number,
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now // Definir o valor padrão como a data/hora atual
  }
});

// Criar o modelo Agendamento com base no esquema
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;
