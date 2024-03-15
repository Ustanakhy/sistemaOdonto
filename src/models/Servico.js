const mongoose = require('mongoose');

// Defina o esquema para Servico
const ServicoSchema = new mongoose.Schema({
  ClinicaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinica', // Nome do seu modelo para 'Clinica'
    required: true
  },
  titulo: {
    type: String,
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
  Duracao: {
    type: Number,
    required: true
  },
  PeriodoDeRetorno: {
    type: Number,
    required: true
  },
  descricao:{
    type:String,
    required:true
  },
  Status: {
    type: String,
    enum: ['A', 'I', 'Excluido'],
    default: 'A',
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

// Criar o modelo Servico com base no esquema
const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;
