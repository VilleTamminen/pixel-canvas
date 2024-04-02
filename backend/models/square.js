const mongoose = require("mongoose");

//all squares are same size: 10x10 pixels?
let Schema = mongoose.Schema({
    //user:{type:String,index:true},
    username:String,
    color:String,
    coordX:Number,
    coordY:Number,
    datetime:Date
})

module.exports = mongoose.model("Square",Schema)
