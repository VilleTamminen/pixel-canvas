const mongoose = require("mongoose");

//private canvas
let Schema = mongoose.Schema({
    user:{type:String,index:true},
    name:String,
    sizeX:Number,
    sizeY:Number
})

module.exports = mongoose.model("Canvas",Schema)