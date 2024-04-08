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
        "id":1,
        "username":"",
        "color":"",
        "coordX":0,
        "coordY":0,
        "datetime":""
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
        let square = {
            ...state,
            color:newcolor
        } 
        props.editSquare(square);
    }

    return (
        <tr>
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
            <td>User that modified square:{state.username}</td>

            <td><button className="btn btn-success" background-color="#04AA6D" 
                onClick={() => editSquare("#04AA6D")}>Green</button></td>
            <td><button className="btn btn-success" background-color="#FF0000" 
                onClick={() => editSquare("#FF0000")}>Red</button></td>
            <td><button className="btn btn-success" background-color="#0000FF" 
                onClick={() => editSquare("#0000FF")}>Blue</button></td>
            <td><button className="btn btn-success" background-color="#FFFF00" 
                onClick={() => editSquare("#FFFF00")}>Yellow</button></td>

            <td><button className="btn btn-danger"
                onClick={ () => props.changeMode("cancel",0)}>Cancel</button></td>
        </tr>
    )

}

/*
<tr>
            <td><input type="text"
                    name="user"
                    id="user"
                    className="form-control"
                    onChange={onChange}
                    value={state.user}/></td>
           <td><input type="text"
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={onChange}
                    value={state.color}/></td>
            <td><input type="number"
                    name="coordX"
                    id="coordX"
                    className="form-control"
                    onChange={onChange}
                    value={state.coordX}/></td>
            <td><input type="number"
                    name="coordY"
                    id="coordY"
                    className="form-control"
                    onChange={onChange}
                    value={state.coordY}/></td>
             <td><input type="date"
                    name="datetime"
                    id="datetime"
                    className="form-control"
                    onChange={onChange}
                    value={state.datetime}/></td>

            <td><button className="btn btn-success" background-color="#04AA6D"
                onClick={editSquare}>Green</button></td>
            <td><button className="btn btn-success" background-color="#ff6347"
                onClick={editSquare}>Red</button></td>
            <td><button className="btn btn-success" background-color="#0077Aff"
                onClick={editSquare}>Blue</button></td>

            <td><button className="btn btn-danger"
                onClick={ () => props.changeMode("cancel",0)}>Cancel</button></td>
        </tr>
*/


export default EditSquare;