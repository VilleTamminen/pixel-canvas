import { useState } from "react";

//Tällä editoidaan Globaalin kanvaan ruutuja
const EditSquare = (props) => {
    /*
    const [state,setState] = useState({
        "user":props.square.user,
        "color":props.square.color,
        "coordX":props.square.coordX,
        "coordY":props.square.coordY,
        "datetime":props.square.datetime
    }) */
    const [state,setState] = useState({
        square:{
            id:props.square.id,
            username:props.square.username,
            color:props.square.color,
            coordX:props.square.coordX,
            coordY:props.square.coordY,
            datetime:props.square.datetime
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

    //Huom! alaviiva id poistettu molemmilla puolilla.
    //poistettu id:props.square.id
    const editSquare = (newcolor) => {
        if(props.cooldownCounter === 0){
            let tempSquare = state.square;
            let currentdate = new Date(); 
            let datetimenow = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
            tempSquare = {
                ...state.square,
                color:newcolor,
                datetime:datetimenow
            } 
            setState({
                square:tempSquare
            })
            props.editSquare(tempSquare);
        } 
        else{
            console.log("wait for cooldown counter to reach 0.")
        } 
    }

    return (
        <>
        <tr>Colored by user: {state.square.username}</tr> 
        <tr>Last edit: {state.square.datetime}</tr> 
        <tr>
            <td><button className="btn btn-success" background-color="#FF0000" style={{marginLeft:10}}
                onClick={() => editSquare("#FF0000")}>Red</button></td>
            <td><button className="btn btn-success" background-color="#FFA500" style={{marginLeft:10}}
                onClick={() => editSquare("#FFA500")}>Orange</button></td>
            <td><button className="btn btn-success" background-color="#FFFF00" style={{marginLeft:10}}
                onClick={() => editSquare("#FFFF00")}>Yellow</button></td>
            <td><button className="btn btn-success" background-color="#04AA6D" style={{marginLeft:10}}
                onClick={() => editSquare("#04AA6D")}>Green</button></td>
            <td><button className="btn btn-success" background-color="#0000FF" style={{marginLeft:10}}
                onClick={() => editSquare("#0000FF")}>Blue</button></td>
            <td><button className="btn btn-success" background-color="#A020F0" style={{marginLeft:10}}
                onClick={() => editSquare("#A020F0")}>Purple</button></td>
            <td><button className="btn btn-success" background-color="#FFFFFF" style={{marginLeft:10}}
                onClick={() => editSquare("#FFFFFF")}>White</button></td>
            <td><button className="btn btn-success" background-color="#808080" style={{marginLeft:10}}
                onClick={() => editSquare("#808080")}>Grey</button></td>
            <td><button className="btn btn-success" background-color="#000000" style={{marginLeft:10}}
                onClick={() => editSquare("#000000")}>Black</button></td>
        </tr>
        </>
    )

}

export default EditSquare;