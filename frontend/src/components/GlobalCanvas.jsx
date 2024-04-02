import {useState} from 'react';
import SquareForm from './SquareForm';
import EditSquare from './EditSquare';

//ei valmis
const GlobalCanvas = (props) => {
	
    // edit mode = voi editoida yhtä pikseliä.
	const [state,setState] = useState({
		editIndex:-1
	})
	/*
	const [search,setSearch] = useState({
		type:""
	})
	*/
	const onChange = (event) => {
        /*
		setSearch({
			type:event.target.value
		}) */
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
	}
	/*
	const searchByType = () => {
		props.getList("",search.type);
		setSearch({
			type:""
		})
	} */
	
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
	/*
	const removeItem = (id) => {
		props.removeItem(id);
		changeMode("cancel")
	}
	*/
	const editSquare = (square) => {
		props.editSquare(square);
		changeMode("cancel");
	}
	
    //Error: props.list is undefined
	let squares = props.squareList.map((square,index) => {
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

export default GlobalCanvas;
