const mongoose = require("mongoose");

//all squares are same size: 10x10 pixels?
let Schema = mongoose.Schema({
    color:String,
    coordX:Number,
    coordY:Number
})

module.exports = mongoose.model("PrivateSquare",Schema)