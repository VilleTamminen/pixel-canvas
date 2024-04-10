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

    return (
        <>
        <tr>Colored by user: {state.square.username}</tr> 
        <tr>Last edit: {state.square.datetime}</tr> 
        <tr>
            <td><button className="btn btn-success" background-color="#04AA6D" style={{margin:"auto",textAlign:"center"}}
                onClick={() => editSquare("#04AA6D")}>Green</button></td>
            <td><button className="btn btn-success" background-color="#FF0000" style={{margin:"auto",textAlign:"center"}}
                onClick={() => editSquare("#FF0000")}>Red</button></td>
            <td><button className="btn btn-success" background-color="#0000FF" style={{margin:"auto",textAlign:"center"}}
                onClick={() => editSquare("#0000FF")}>Blue</button></td>
            <td><button className="btn btn-success" background-color="#FFFF00" style={{margin:"auto",textAlign:"center"}}
                onClick={() => editSquare("#FFFF00")}>Yellow</button></td>

            <td><button className="btn btn-danger" style={{margin:"auto",textAlign:"center"}}
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