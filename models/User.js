var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true}, //, index: { unique: true }
    surname: { type: String, required: true },
    address: String,
    role: { type: String, required: true },
    state:{type: Boolean, required: true},
    bloqueado:{type: Boolean, required: true},
    password: { type: String, required: true }
    //_id: { type: String }
   // wallet:Number
});

module.exports = mongoose.model('User', UserSchema);