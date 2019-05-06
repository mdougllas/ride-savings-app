const mongoose     = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const TempSchema = mongoose.Schema({
  uberId: String
});

TempSchema.plugin(findOrCreate);
const Temp = mongoose.model('Temp', TempSchema);

module.exports = Temp;