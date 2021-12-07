const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   images:{
        type:String,
        
     }
});
module.exports = User = mongoose.model('glies',UserSchema);
