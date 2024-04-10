import {useState} from 'react';
import SquareForm from './SquareForm';
import EditSquare from './EditSquare';

//ei valmis. kopio globalcanvas.jsx. Local storage? ei käytössä
//Private canvas
const Canvas = (props) => {
	
    // edit mode = voi editoida yhtä pikseliä.
	const [state,setState] = useState({
		editIndex:-1
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

	const editSquare = (square) => {
		props.editSquare(square);
		changeMode("cancel");
	}
	
    //Error: props.list is undefined
	let squares = props.list.map((square,index) => {
		if(index === state.editIndex) {
			return(
				<EditSquare key={item._id} item={item} changeMode={changeMode} editSquare={editSquare}/>
			)
		}
		return(
			<Square key={square._id} square={square} changeMode={changeMode} index={index}/>
		)
	})
	return(
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
	)
}

export default Canvas;
