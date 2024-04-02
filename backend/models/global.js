const mongoose = require("mongoose");
//global canvas
let Schema = mongoose.Schema({
    sizeX:Number,
    sizeY:Number
})

module.exports = mongoose.model("Global",Schema)