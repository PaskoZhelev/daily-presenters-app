const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, unique: true, index: true },
  lastGeneratedDate: { type: Date },
});

projectSchema.index({ name: 1}, { unique: true, dropDups: true });

module.exports = mongoose.model('Project', projectSchema);