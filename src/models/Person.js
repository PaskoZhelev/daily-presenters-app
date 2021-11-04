const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, index: true },
  project: { type: String, index: true },
});

personSchema.index({ name: 1, project: 1 }, { unique: true, dropDups: true });

module.exports = mongoose.model('Person', personSchema);