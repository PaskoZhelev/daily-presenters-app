const mongoose = require('mongoose');

const presenterSchema = new mongoose.Schema({
  project: { type: String, index: true },
  date: { type: Date, index: true },
  person: String,
});

presenterSchema.index({ project: 1, date: 1 }, { unique: true, dropDups: true });

module.exports = mongoose.model('Presenter', presenterSchema);