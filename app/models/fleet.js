var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Fleet', new Schema({
  FleetName: String,
  Industry: String,
  Currency: String,
  TimeZone: String,
  StreetAddress: String,
  City: String,
  Region: String,
  Country: String,
  PhoneNumber: String
}));
