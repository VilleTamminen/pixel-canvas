const express = require("express");
const squareModel = require("../models/square");
const canvasModel = require("../models/canvas");
const privateSquareModel = require("../models/privatesquare");

let router = express.Router();

//------------GLOBAL CANVAS STUFF--------------------------------------------------

router.get("/place",function(req,res) {
   //Etsi kaikki squaret
	squareModel.find().then(function(squares) {
		return res.status(200).json(squares)
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

//For testing. Tämä toimii
router.get("/place/:id",function(req,res) {
    //Etsi tietty square
    squareModel.find({"id":req.params.id}).then(function(squares) {
        return res.status(200).json(squares)
    }).catch(function(err) {
        console.log(err);
        return res.status(500).json({"Message":"Internal server error"})
    })
})

//Global square edit. 
router.put("/place/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request. no body"})
	}
    if(!req.body.id) {
		return res.status(400).json({"Message":"Bad Request. no body.id"})
	} 
    //ei tehdä uutta squareModelia.
    //"username":req.session.user,
	let square = {
        "id":req.body.id,
		"username":req.session.user,
		"color":req.body.color,
		"coordX":req.body.coordX,
		"coordY":req.body.coordY,
        "datetime":req.body.datetime,
	}
    //otin alaviivan pois id:sta enkä etsi userin omia.
	squareModel.replaceOne({"id":req.params.id},square).then(function(stats) {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

router.delete("/place/:id",function(req,res) {
	squareModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function(stats) {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

//----------PRIVATE CANVAS STUFF-------------------------------------------
/*
//private canvas ?
router.get("/place",function(req,res) {
	let query = {"user":req.session.user}
	if(req.query.type) {
		query.type = req.query.type
	}
	privateSquareModel.find(query).then(function(squares) {
		return res.status(200).json(squares)
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

//SQUAREJA EI VOI LISÄTÄ TAI POISTAA, AINOASTAAN VAIHTAA VÄRIÄ
//CANVAKSIA VOI LISÄTÄ JA POISTAA JA MUOKATA
router.post("/place",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let canvas = new canvasModel({
		"user":req.session.user,
		"name":req.body.name,
		"sizeX":req.body.sizeX,
		"sizeY":req.body.sizeY,
	})
	canvas.save().then(function(canvas) {
		return res.status(201).json(canvas)
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

router.delete("/place/:id",function(req,res) {
	canvasModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function(stats) {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

//private CANVASTA EI VOI MUOKATA LUOMISEN JÄLKEEN, MUTTA SQUAREJA VOI
//vaatisi tupla id, jos on montaprivate canvasta ???
// /place/global/:id ???
router.put("/place/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
    //ei tehdä uutta squareModelia.
	let privateSquare = {
		//"user":req.session.user,
		"color":req.body.color,
		"coordX":req.body.coorX,
		"coordY":req.body.coordY,
       // "datetime":req.body.datetime,
	}
	privateSquareModel.replaceOne({"_id":req.params.id,"user":req.session.user},square).then(function(stats) {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})
*/

module.exports = router;