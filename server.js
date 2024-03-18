const express = require("express");
//require mongoose? and install it?
let app = express();

app.use("/",express.static("public"));

app.use(express.json());

//Koodia----------



app.listen(3000);

console.log("Running in port 3000");