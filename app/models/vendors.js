var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Vendors', new Schema({
  VendorName: String,
  PhoneNumber: String,
  Website: String,
  Address: String,
  AddressLine2: String,
  City: String,
  State: String,
  ZipPostal: String,
  Country: String,
  ContactName: String,
  Email: String,
  Phone: String
}));
