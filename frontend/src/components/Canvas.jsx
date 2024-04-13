import {useState, useEffect} from 'react';
import EditSquare from './EditSquare';
import PrivateSquare from './PrivateSquare';
import React from 'react';
import * as utilityConstants from './utilityConstants';

// localStorage: https://github.com/Wantonius/OKKS2024K/tree/main/javascript/06_web_storage/public 
//Private canvas. Because this local storage, if another user uses same computer they can see same storage.
const Canvas = (props) => {

    let starterSquares = '[{"id":1,"color":"#00ff55"},{"id":2,"color":"#808080"},{"id":3,"color":"#c2c2c2"},{"id":4,"color":"#808080"},{"id":5,"color":"#c2c2c2"},{"id":6,"color":"#808080"},{"id":7,"color":"#c2c2c2"},{"id":8,"color":"#808080"},{"id":9,"color":"#c2c2c2"},{"id":10,"color":"#00ff55"}]';
    let privateSquares; //used to map react components
    let privateSquaresList; //used to store square info to local storage

    window.onload = function() {
        console.log("windows onload"); //debugging
        if(privateSquares){
            console.log("privateSquares is not empty")
            getLocalStorage();
        }
        else{
            console.log("privateSquares is empty")
            getLocalStorage();
        }
    }
    function getLocalStorage(){
        //squaret täytyy hakea vain kun sivu latautuu
        if(localStorage.getItem("privateSquares")) {
            privateSquaresList = JSON.parse(localStorage.getItem("privateSquares"));
            setState({
				list:privateSquaresList
			})
            CreateGrid();
        }
        else{
            console.log("nothing in local storage")
            createCanvas();
        }
    }

    function storeToLocalStorage() {
        if(privateSquaresList){
            localStorage.setItem("privateSquares",JSON.stringify(privateSquaresList)); //Uncaught TypeError: cyclic object value
        }
        else{
            console.log("privateSquaresList is empty. Can't save them to local storage."); //debugging
        }
    }

	const [state,setState] = useState({
        test:0,
        selectedSquareId:1,
        square:{
            id:0,
            color:"#FFFFFF"
        },
        list:[]
	})
    useEffect(() => {
        //window.onload ei toimi, siksi useEffect()
        if(!privateSquaresList){
            getLocalStorage();
        }
    }, []);

	const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
	}

    const editSquare = (newcolor) => {
        if(state.selectedSquareId){
            let id = state.selectedSquareId;
            //getPrivateSquareList();
            if(localStorage.getItem("privateSquares")) {
                privateSquaresList = JSON.parse(localStorage.getItem("privateSquares"));
                setState({
                    list:privateSquaresList
                })
            }
            console.log("edit: "+privateSquaresList[id-1].id + " - "+privateSquaresList[id-1].color + " to " +newcolor);
            //index starts at 0 so we decrease by one
            privateSquaresList[id-1] = {id:id,color:newcolor};
            storeToLocalStorage();

            //Map the squares again to show changes
            privateSquares = privateSquaresList.map((square) => {
                if(square.id % utilityConstants.PrivateCanvasSquareRowSize === 0){
                    return(
                        <>
                            <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                            <br/>
                        </>
                    )
                }
                return(
                    <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                )
            })
            setState({
                list:privateSquaresList
            })
        }
        else{
            console.log("select a square");
        }
    }

    function createCanvas(){
        console.log("create canvas"); //debugging
        let message = "";
        let squareMax = utilityConstants.PrivateCanvasSquareRowSize * utilityConstants.PrivateCanvasSquareRowSize; //total number of squares
        for(let i=1;i<=squareMax;i++){
           message = message + JSON.stringify({id:i,color:'#bfbfbf'}); //light grey color
           if(i !== squareMax){  message = message + ","} //don't include comma at the very end
        } 
        privateSquaresList = JSON.parse("["+message+"]");
        storeToLocalStorage();
        CreateGrid();
    }
    function CreateGrid(){
        console.log("create grid"); //debugging
       // getPrivateSquareList();
       if(localStorage.getItem("privateSquares")) {
            privateSquaresList = JSON.parse(localStorage.getItem("privateSquares"));
            setState({
                list:privateSquaresList
            })
        }
        privateSquaresList.sort((a, b) => a.id > b.id );
        privateSquares = privateSquaresList.map((square) => {
            //Lisää rivinvaihto 
            if(square.id % utilityConstants.PrivateCanvasSquareRowSize === 0){
                return(
                    <>
                        <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                        <br/>
                    </>
                )
            }
            return(
                <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
            )
	    })
        setState({
            list:privateSquaresList
        })
    }

    const clearCanvas = () => {
        //Turn all squares to white/grey
        createCanvas();
    }

    if(!privateSquaresList){
        if(localStorage.getItem("privateSquares")) {
            privateSquaresList = JSON.parse(localStorage.getItem("privateSquares"));

            privateSquaresList.sort((a, b) => a.id > b.id );
            privateSquares = privateSquaresList.map((square) => {
                //Lisää rivinvaihto 
                if(square.id % utilityConstants.PrivateCanvasSquareRowSize === 0){
                    return(
                        <>
                            <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                            <br/>
                        </>
                    )
                }
                return(
                    <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                )
            })
        }
        else{
            createCanvas();
        }
    }
    else{
        privateSquaresList.sort((a, b) => a.id > b.id );
        privateSquares = privateSquaresList.map((square) => {
            //Lisää rivinvaihto 
            if(square.id % utilityConstants.PrivateCanvasSquareRowSize === 0){
                return(
                    <>
                        <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
                        <br/>
                    </>
                )
            }
            return(
                <PrivateSquare key={square.id} id={"square"+square.id} square={square} />
            )
        })
    }

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

    function findSquareId(x,y){
        //ensimmäisen ruudun koordinaatti on x:0 y:0, mutta id pitää olla yksi, joten x ja y saa +1
        let squareX = (x / utilityConstants.PrivateCanvasSquareSize)+1; //rounded coordinate gives position in row 
        let squareY = (y / utilityConstants.PrivateCanvasSquareSize)+1; //rounded coordinate gives column
        // Kerro Y rivilukumäärällä, lisää X ja vähennä yksi rivilukumäärä.
        let id = squareY * (utilityConstants.PrivateCanvasSquareRowSize) + squareX - utilityConstants.PrivateCanvasSquareRowSize;
       // console.log("find square id: squareX "+squareX+", squareY "+squareY+",final id "+id); //debugging
       console.log("found square id: "+id);
        return id;
    }
    const mouseClick = (e) => {
        // e = Mouse click event.
        let squareFieldDiv = e.currentTarget.getBoundingClientRect();
        if(!e.currentTarget){
            squareFieldDiv = e.getBoundingClientRect();
            console.log("no e.currentTarget aka no SquareField"); //debugging
        }    
        let xInElement = e.clientX - squareFieldDiv.left; //x position within the SquareField div element.
        let yInElement = e.clientY - squareFieldDiv.top;  //y position within the SquareField div element.
        //Jos klikattiin ruutujen ohi niin ignore
        if(xInElement > utilityConstants.PrivateCanvasSquareSize * utilityConstants.PrivateCanvasSquareRowSize){
            console.log("You didn't click square.");
        }
        else {
             //Do math to find corner coordinates of the square
            let x = roundX(xInElement, utilityConstants.PrivateCanvasSquareSize);
            let y = roundX(yInElement, utilityConstants.PrivateCanvasSquareSize);
            setState({
                selectedSquareId:findSquareId(x,y)
            }) 
        }
    };

    /* target is the element that triggered the event (e.g., the user clicked on)
    currentTarget is the element that the event listener is attached to   */
	return(
        <>
        <tr>Selected square id: {state.selectedSquareId}</tr>
        <tr>
            <td><button className="btn btn-secondary" background-color="#FF0000" style={{marginLeft:10}}
                onClick={() => editSquare("#FF0000")}>Red</button></td>
            <td><button className="btn btn-secondary" background-color="#FFA500" style={{marginLeft:10}}
                onClick={() => editSquare("#FFA500")}>Orange</button></td>
            <td><button className="btn btn-secondary" background-color="#FFFF00" style={{marginLeft:10}}
                onClick={() => editSquare("#FFFF00")}>Yellow</button></td>
            <td><button className="btn btn-secondary" background-color="#04AA6D" style={{marginLeft:10}}
                onClick={() => editSquare("#04AA6D")}>Green</button></td>
            <td><button className="btn btn-secondary" background-color="#0000FF" style={{marginLeft:10}}
                onClick={() => editSquare("#0000FF")}>Blue</button></td>
            <td><button className="btn btn-secondary" background-color="#A020F0" style={{marginLeft:10}}
                onClick={() => editSquare("#A020F0")}>Purple</button></td>
            <td><button className="btn btn-secondary" background-color="#FFFFFF" style={{marginLeft:10}}
                onClick={() => editSquare("#FFFFFF")}>White</button></td>
            <td><button className="btn btn-secondary" background-color="#808080" style={{marginLeft:10}}
                onClick={() => editSquare("#808080")}>Grey</button></td>
            <td><button className="btn btn-secondary" background-color="#000000" style={{marginLeft:10}}
                onClick={() => editSquare("#000000")}>Black</button></td>
        </tr>
        <tr>
        <td><button className="btn btn-danger" background-color="#FF0000" style={{marginLeft:10}}
                onClick={() => createCanvas()}>Clear the canvas</button></td>
        </tr>
        <div id="SquareField" onClick={mouseClick}>
            {privateSquares}
        </div>
        </>
	)
}

export default Canvas;
