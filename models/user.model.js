const mongoose = require('mongoose'); // Erase if already required
const passportLocalMongoose = require('passport-local-mongoose')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique:true,
    },
    "phone number":{
        type:String,
        required:true,
        unique:true,
    },
    orders: 
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order'
    },
    address: String
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema);