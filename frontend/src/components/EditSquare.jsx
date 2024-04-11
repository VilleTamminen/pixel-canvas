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
            console.log("datetime:"+datetimenow);         //datetime:Last Sync: 1/4/2024 @ 20:49:43 
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
            <td><button className="btn btn-success" background-color="#FF0000"
                onClick={() => editSquare("#FF0000")}>Red</button></td>
            <td><button className="btn btn-success" background-color="#FFA500" 
                onClick={() => editSquare("#FFA500")}>Orange</button></td>
            <td><button className="btn btn-success" background-color="#FFFF00" 
                onClick={() => editSquare("#FFFF00")}>Yellow</button></td>
            <td><button className="btn btn-success" background-color="#04AA6D"
                onClick={() => editSquare("#04AA6D")}>Green</button></td>
            <td><button className="btn btn-success" background-color="#0000FF" 
                onClick={() => editSquare("#0000FF")}>Blue</button></td>
            <td><button className="btn btn-success" background-color="#A020F0" 
                onClick={() => editSquare("#A020F0")}>Purple</button></td>
            <td><button className="btn btn-success" background-color="#FFFFFF" 
                onClick={() => editSquare("#FFFFFF")}>White</button></td>
            <td><button className="btn btn-success" background-color="#808080" 
                onClick={() => editSquare("#808080")}>Grey</button></td>
            <td><button className="btn btn-success" background-color="#000000" 
                onClick={() => editSquare("#000000")}>Black</button></td>

            <td><button className="btn btn-danger" 
                onClick={ () => props.changeMode("cancel",0)}>Cancel</button></td>
        </tr>
        </>
    )

}

/*
 <td><input type="text"
                    name="id"
                    id="id"
                    className="form-control"
                    onChange={onChange}
                    />id</td>
            <td><input type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={onChange}
                    />username</td>
           <td><input type="text"
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={onChange}
                    />color</td>
            <td><input type="number"
                    name="coordX"
                    id="coordX"
                    className="form-control"
                    onChange={onChange}
                    />coordX</td>
            <td><input type="number"
                    name="coordY"
                    id="coordY"
                    className="form-control"
                    onChange={onChange}
                    />coordY</td>
             <td><input type="date"
                    name="datetime"
                    id="datetime"
                    className="form-control"
                    onChange={onChange}
                    />datetime</td>
            <br/>
*/


export default EditSquare;