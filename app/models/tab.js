// app/models/tabs.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var tabSchema = mongoose.Schema({
    name            : String,
    description     : String,
    currency        : String,
    peeps           : [Number],
    reg_date        : Number, //creation date
    mod_date        : Number //last modified


});

// create the model for users and expose it to our app
module.exports = mongoose.model('Tab', tabSchema);