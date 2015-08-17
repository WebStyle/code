var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Services', new Schema({
  Date: String,
  Vehicle: String,
  Odometer: String,
  Vendor: String,
  Reference: String,
  Documents: String,
  Comment: String
}));
