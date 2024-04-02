import { useState } from "react";

//ei valmis
//Tämä on globaalia canvasta varten
const EditSquare = (props => {

    const [state,setState] = useState({
        "user":props.square.user,
        "color":props.square.color,
        "coordX":props.square.coordX,
        "coordY":props.square.coordY,
        "datetime":props.square.datetime
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    //Huom! alaviiva id molemmilla puolilla
    const editSquare = () => {
        let square = {
            ...state,
            _id:props.square._id
        }
        props.editSquare(square);
    }

    return (
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
    )

})

export default EditSquare;