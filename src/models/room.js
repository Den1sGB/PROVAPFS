const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  participants: { type: [String], default: [] }, // Para armazenar IDs de participantes
  isActive: { type: Boolean, default: true }, // Adicionando o campo isActive
}, { timestamps: true });

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);