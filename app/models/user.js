var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Pass: String,
  Phone: String,
  Pass: String
}));
