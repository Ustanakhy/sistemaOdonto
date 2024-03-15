const mongoose = require('mongoose');

// Defina o esquema para Cliente
const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Garante que cada email seja único
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  senha: String,
  telefone: String,
  Cpf: {
    type: String,
    required: true,
    unique: true // Garante que cada CPF seja único
  },
  endereco: {
    type: mongoose.Schema.Types.Mixed // Armazena dados de endereço como um objeto JSON
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  recipienteId: {
    type: String,
    required: true
  }
});

// Criar o modelo Cliente com base no esquema
const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
