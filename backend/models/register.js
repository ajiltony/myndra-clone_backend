 const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product ={
  type: Schema.Types.ObjectId,
  ref:"addcard"
}
var UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
},
Dob: {
  type: String,
  required: true
},
location: {
  type: String,
  required: true
},
 bag:[product],
})
module.exports = register = mongoose.model('register', UserSchema)