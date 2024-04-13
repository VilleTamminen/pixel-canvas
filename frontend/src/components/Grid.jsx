import { useState } from "react";

//ei käytössä
const Grid = (props) => {

    const [state,setState] = useState({

    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

   

    return (
        <>

        </>
    )

}


export default Grid;