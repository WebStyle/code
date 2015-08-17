var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Issues', new Schema({
  Vehicle: String,
  ReportedOn: String,
  Summary: String,
  Description: String,
  Odometer: String,
  Labels: String
}));
