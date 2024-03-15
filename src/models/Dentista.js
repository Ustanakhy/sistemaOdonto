const mongoose = require('mongoose');

// Defina o esquema para Dentista
const DentistaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  foto: {
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
    unique: true, // Garante que cada email seja único
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v); // Valida o formato do email
      },
      message: props => `${props.value} não é um email válido!`
    }
  },
  senha: String,
  telefone: String,
  Cpf: {
    type: String,
    required: true,
    unique: true // Garante que cada CPF seja único
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

// Criar o modelo Dentista com base no esquema
const Dentista = mongoose.model('Dentista', DentistaSchema);

module.exports = Dentista;
