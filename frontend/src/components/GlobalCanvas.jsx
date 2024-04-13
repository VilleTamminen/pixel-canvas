import {useState, useEffect} from 'react';
import EditSquare from './EditSquare';
import Square from './Square';
import React from 'react';
import * as utilityConstants from './utilityConstants';

//alustana ShoppingList
const GlobalCanvas = (props) => {
	
    let squares;
    var squareFieldDiv;

    window.onload = function() {
        squareFieldDiv = document.getElementById("SquareField"); //ei tarpeellinen
        reloadSquares();
    }

	const [state,setState] = useState({
		editIndex:-1,
        square:{
            id:0,
            username:"",
            color:"",
            coordX:0,
            coordY:0,
            datetime:""
        }
	})
    
	const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
	}
	
	const changeMode = (mode,index) => {
		if(mode === "cancel") {
			setState({
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				editIndex:index
			})
		}
        else{
            setState({
				editIndex:-1
			})
        }
	}

    //Edit Global square
	const editSquare = (newSquare) => { 
		props.editSquare(newSquare);
        setCooldownCounter(utilityConstants.GlobalCanvasCooldown);
		//changeMode("cancel");
	}

    //Counter for cooldown time of editing global squares
    const [cooldownCounter, setCooldownCounter] = useState(utilityConstants.GlobalCanvasCooldown);
    useEffect(() => {
        cooldownCounter > 0 && setTimeout(() => setCooldownCounter(cooldownCounter - 1), 1000);
    }, [cooldownCounter]);

    //Counter for updating squareList
    const [counter, setCounter] = useState(utilityConstants.GlobalCanvasUpdate);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        if(counter === 0){
            reloadSquares();
        }
    }, [counter]);
	function reloadSquares(){
        props.getSquareList();
        setCounter(utilityConstants.GlobalCanvasUpdate)
    }

    //Squaret ovat sekaisin, ne täytyy saada id:n mukaan sommiteltua tai coordinaattien mukaan oikeisiin kohtiin?
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_with_map 
    squares = props.squareList.sort((a, b) => a.id > b.id );
	squares = squares.map((square,index) => {
        //Lisää rivinvaihto 
        //poistettu Square changeMode={changeMode} index={index}
        if(square.id % utilityConstants.GlobalCanvasSquareRowSize === 0){
            return(
                <>
                    <Square key={square._id} square={square} />
                    <br/>
                </>
            )
        }
		return(
			<Square key={square._id} square={square} />
		)
	})

    // MOUSE CLICK EVENT FOR CLICKING SQUARES 
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX 
    // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element 
    function roundX(x, roundingBase)
    {
        if(x % roundingBase == 0){
            return x;
        }
        else{
            //Math.ceil rounds up, so we decrease roundingBase at the end to get lowest value. Because coordinate origin is top-left corner.
            //ONLY IF x IS NOT MULTIPLE OF roundingBase
            //Eli jos x=487 ja roundingBase=50, return 450
            return Math.ceil(x / roundingBase) * roundingBase - roundingBase;
        }
    }
    function selectSquareWithId(squareId){
        //Select square so that EditSquare can use it
        let tempSquares = props.squareList.sort((a, b) => a.id > b.id );
       // console.log("global canvas select square id: " +tempSquares[squareId-1].id + "  coordX: " +tempSquares[squareId-1].coordX) //debugging
        setState((state) => {
            return {
                ...state,
                square:tempSquares[squareId-1]
            }
        })
    }
    function findSquareId(x,y){
        //ensimmäisen ruudun koordinaatti on x:0 y:0, mutta id pitää olla yksi, joten x ja y saa +1
        let squareX = (x / utilityConstants.GlobalCanvasSquareSize)+1; //rounded coordinate gives position in row 
        let squareY = (y / utilityConstants.GlobalCanvasSquareSize)+1; //rounded coordinate gives column
        // Kerro Y rivilukumäärällä, lisää X ja vähennä yksi rivilukumäärä.
        let id = squareY * (utilityConstants.GlobalCanvasSquareRowSize) + squareX - utilityConstants.GlobalCanvasSquareRowSize;
       // console.log("find square id: squareX "+squareX+", squareY "+squareY+",final id "+id); //debugging
        return id;
    }
    const mouseClick = (e) => {
        // e = Mouse click event.
        squareFieldDiv = e.currentTarget.getBoundingClientRect();
        if(!e.currentTarget){
            squareFieldDiv = e.getBoundingClientRect();
            console.log("no e.currentTarget aka no SquareField"); //debugging
        }    
        let xInElement = e.clientX - squareFieldDiv.left; //x position within the SquareField div element.
        let yInElement = e.clientY - squareFieldDiv.top;  //y position within the SquareField div element.
        //Jos klikattiin ruutujen ohi niin ignore
        if(xInElement > utilityConstants.GlobalCanvasSquareSize * utilityConstants.GlobalCanvasSquareRowSize){
            console.log("You didn't click square.");
        }
        else {
           // console.log("x: " + xInElement + "  y: " + yInElement + + " || clientX "+ e.clientX + " clientY: "+e.clientY+" || div.left: "+squareFieldDiv.left+ " div.top: "+squareFieldDiv.top ); //debugging
            //Do math to find corner coordinates of the square
            let x = roundX(xInElement, utilityConstants.GlobalCanvasSquareSize);
            let y = roundX(yInElement, utilityConstants.GlobalCanvasSquareSize);
           // console.log("after rounding x: "+ x + " y: " +y); //debugging
            //Find square id and use it to set state square
            selectSquareWithId(findSquareId(x,y)); 
        }
    };

    //SVG element ei voi olla <table> sisällä
    // EditSquare key={square._id}  square={square} changeMode={changeMode}
	return(
        <>
            <EditSquare key={state.square._id} square={state.square} cooldownCounter={cooldownCounter} changeMode={changeMode} editSquare={editSquare} />
            <div>Cooldown: {cooldownCounter}</div>
            <div id='SquareFieldDiv' onClick={mouseClick} >
                {squares}
            </div>
        </>
	)

    
}

export default GlobalCanvas;
