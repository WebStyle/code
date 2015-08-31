var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Reminders', new Schema({
    Id:        String,
    Fleet:     String,
    Entity:    String,
    EntityId:  String,
    Title:     String,
    Info:      String,
    Interval:  String,
    RemindAt:  String,
    Done:      String,
    Expire:    String,

    Deleted:   Boolean,

    CreatedAt: String,
    UpdatedAt: String,
    DeletedAt: String,

    CreatedBy: String,
    UpdatedBy: String,
    DeletedBy: String

}));
