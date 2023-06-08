const mongoose = require('mongoose')
const Schema= mongoose.Schema


const userScheme = new Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    quote:{
        type:String,
    }
},{collection:'user-data'})

module.exports = mongoose.model('User-Data', userScheme)