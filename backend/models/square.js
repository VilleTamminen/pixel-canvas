const mongoose = require("mongoose");

//user:{type:String,index:true},
let Schema = mongoose.Schema({
    id:Number,
    username:String,
    color:String,
    coordX:Number,
    coordY:Number,
    datetime:Date
})

module.exports = mongoose.model("Square",Schema)
