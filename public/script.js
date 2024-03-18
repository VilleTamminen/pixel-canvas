/*
https://github.com/SelbyJGomes/R-Place/tree/master      (JavaScript and NodeJS)
https://codepen.io/ste-vg/pen/dvLvzy                    (Typescript)
https://www.youtube.com/watch?v=XSw5fFo0_pA             (javascript + PHP vue)
https://github.com/aschmelyun/laraplace                 (ylemmän videon github. hämmentävä)
https://github.com/dynastic/place                       (Javascript, NodeJS, Mongo, Yarn package manager)
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}

var PixelSchema = new Schema({
    xPos: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    },
    yPos: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    },
    editorID: {
        type: Schema.ObjectId,
        required: false
    },
    lastModified: {
        type: Date,
        required: true
    },
    colour:{
        type: string,
        required: true
    }
});

const pixel = () =>
{
	let yPos;
    let xPos;
    let color;
}

const activePixel = ref(null);
const canvasClicked = (e) => {
    let clickedX = e.pageX / 16;
    let clickedY = e.pageY;
//huomaa ´-merkki ei ole heittomerkki
activePixel.value = `${clickedX}:${clickedY}`;
}

//let cursor = Pixel.find().cursor();

function changePixelColor(){

}
const colors = [ 'ffffff',
				 'e4e4e4',
				 '888888',
				 '222222',
				 'ffa7d1',
				 'e50000',
				 'e59500',
				 'a06a42',
				 'e5d900',
				 '94e044',
				 '02be01',
				 '00d3dd',
				 '0083c7',
				 '0000ea',
				 'cf6ee4',
				 '820080'
                ];
const gridSize = [500, 500];
const squareSize = [5, 5];
const coolDownTime = 500; //milliseconds
let uid = ""; //user id


//Codepen code
function writePixel(x=0,y=0,color='ffffff'){
    //if we have user id 
    if(uid){
       
    }
}
function createRect(x = 0, y= 0){
    let side = 5;
    let color = "#";
    const colorpicker = "0123456789ABCDEF";

    for(let i=0;i<6;i++){
        let temp = Math.floor(Math.random()*16);
        color = color + colorpicker[temp];
    }

    ctx.fillStyle = color;
    ctx.fillRect(x,y,side,side);
}

//pixel data contains data of all pixels
let pixelData = [

]

function updatePixelData(){
    
}

function startCanvas(){
    if(running){
        running = 0;
        clearInterval(interval);
        document.getElementById("startbutton").innerHTML = "Start";       
    }
    else {
        running = 1;
        interval = setInterval(createRect, 200);
        document.getElementById("startbutton").innerHTML = "Stop";    
    }

}
