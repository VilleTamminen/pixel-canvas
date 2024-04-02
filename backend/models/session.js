const mongoose = require("mongoose");

//ttl = time to live. token = avain jolla käytetään sessiota.
let Schema = mongoose.Schema({
    user:{type:String,index:true},
    ttl:Number,
    token:String
})

module.exports = mongoose.model("Session",Schema)