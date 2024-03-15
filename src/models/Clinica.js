const mongoose = require('mongoose');

// Defina o esquema para Clinica
const ClinicaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  foto: String,
  capa: String,
  email: {
    type: String,
    required: true,
    unique: true // Garante que cada email seja único
  },
  senha: String,
  telefone: String,
  endereco: {
    type: mongoose.Schema.Types.Mixed // Armazena dados de endereço como um objeto JSON
  },
  geo: {
    type: mongoose.Schema.Types.Mixed // Armazena dados de localização geográfica como um objeto JSON
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  CNPJ: {
    type: String,
    required: true,
    unique: true // Garante que cada CNPJ seja único
  }
});

// Criar o modelo Clinica com base no esquema
const Clinica = mongoose.model('Clinica', ClinicaSchema);

module.exports = Clinica;
