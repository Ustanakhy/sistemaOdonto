const mongoose = require('mongoose');

// Defina o esquema para Horario
const HorarioSchema = new mongoose.Schema({
  ClinicaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinica', // Nome do seu modelo para 'Clinica'
    required: true
  },
  especialidades: {
    type: [Number], // Tipo array de números para IDs de especialidades
    required: true
  },
  dentista: {
    type: [Number], // Tipo array de números para IDs de dentistas
    required: true
  },
  dias: {
    type: [Number], // Tipo array de números para representar dias da semana
    required: true
  },
  inicio: {
    type: Date,
    required: true
  },
  fim: {
    type: Date,
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

// Criar o modelo Horario com base no esquema
const Horario = mongoose.model('Horario', HorarioSchema);

module.exports = Horario;
