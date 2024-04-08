import {useState, useEffect} from 'react';
import SquareForm from './SquareForm';
import EditSquare from './EditSquare';
import Square from './Square';
import React from 'react';
import * as utilityConstants from './utilityConstants';

//alustana ShoppingList
const GlobalCanvas = (props) => {
	
    // edit mode = voi editoida yhtä pikseliä.
	const [state,setState] = useState({
		editIndex:-1,
        square:{
            "id":1,
            "username":"",
            "color":"",
            "coordX":0,
            "coordY":0,
            "datetime":""
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
	const editSquare = (square) => {
		props.editSquare(square);
		changeMode("cancel");
	}
	
    //Squaret ovat sekaisin, ne täytyy saada id:n mukaan sommiteltua tai coordinaattien mukaan oikeisiin kohtiin?
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_with_map 
    let squares = props.squareList.sort((a, b) => a.id > b.id );

	squares = squares.map((square,index) => {
        //Lisää rivinvaihto 
        //poiustettu Square changeMode={changeMode} index={index}
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

    let editSquares = props.squareList.map((square) => {
        return  <EditSquare key={square._id} square={square} changeMode={changeMode} editSquare={editSquare}/>
    })
    
    //Has to load DOM before we can access element ids.
   // React.useEffect(() =>{
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX 
        // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element 
         //document.addEventListener("mouseclick", mouseClick);

        const mouseClick = (e) => {
            console.log("Mouse click"); //debugging
            // e = Mouse click event.
            var rect = e.target.getBoundingClientRect();
            if(!e.target){
                rect = e.getBoundingClientRect();
            }
            var xInElement = e.clientX - rect.left; //x position within the element.
            var yInElement = e.clientY - rect.top;  //y position within the element.
            console.log("Left? : " + xInElement + " ; Top? : " + yInElement + ".");

            //Do math to find corner coordinates of the square
            let x = roundX(xInElement, utilityConstants.GlobalCanvasSquareSize);
            let y = roundX(yInElement, utilityConstants.GlobalCanvasSquareSize);
            findSquareId(x,y);
            selectSquare(findSquareId(x,y));
            // Client/Screen X coordinate is same. Y coordinate has about 80 in height difference. Screen includes top bar of tabs etc.
           // console.log(`Screen X/Y: ${e.screenX}, ${e.screenY} Client X/Y: ${e.clientX}, ${e.clientY}`);
        };
        function findSquareId(x,y){
            console.log("find square id"); //debugging
            let squareX = x / utilityConstants.GlobalCanvasSquareSize;
            let squareY = y / utilityConstants.GlobalCanvasSquareSize;
            // Kerro Y rivilukumäärällä, lisää X ja vähennä yksi rivilukumäärä.
            return squareY * (utilityConstants.GlobalCanvasSquareSize) + squareX - utilityConstants.GlobalCanvasSquareSize;
        }
        function selectSquare(selectedsquare){
            //Select square so that EditSquare can use it
            //kun on saatu square niin EditSquare key={square._id} voidaan laittaa takaisin
            state.square = selectedsquare;

        }
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
        document.addEventListener("mouseclick",mouseClick);
        // document.getElementById('SquareField').addEventListener("mouseclick",mouseClick);
        /*
        function mouseMove(e) {
            console.log(`Screen X/Y: ${e.screenX}, ${e.screenY} Client X/Y: ${e.clientX}, ${e.clientY}`);
        }
        document.addEventListener("mousemove",mouseMove); */

   // }, [])  //React.useEffect end

    //SVG element ei voi olla <table> sisällä
    // EditSquare key={square._id}  square={square} changeMode={changeMode}
	return(
        <>
            <EditSquare changeMode={changeMode} editSquare={editSquare}/>
            <div id='SquareField'>
                {squares}
            </div>
        </>
	)

    
}

/*
	<div>
		<table className="table table-striped">
			<thead>
				<tr>
					<th>User</th>
					<th>Color</th>
				</tr>
			</thead>
			<tbody>
			{squares}
			</tbody>
		</table>
	</div>
*/



export default GlobalCanvas;
