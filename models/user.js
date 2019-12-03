const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String},
    username: { type: String },
    Firstname: { type: String },
    Lastname: { type: String },
    createdAt: { type: Date, default: Date.now }
});


// userSchema.methods.hasSamePassword = function(requestedPassword) {

//     return bcrypt.compareSync(requestedPassword, this.password);
//   }


module.exports = mongoose.model('Users', userSchema);