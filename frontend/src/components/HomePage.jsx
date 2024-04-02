import { useState } from "react";

const HomePage = (props) => {
    /*
    const [state,setState] = useState({
        username:"",
        password:""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    } */

    const onSubmit = (event) => {
        event.preventDefault();

        if(event.target.name === "privatecanvas"){
            props.privatecanvas();
        }
        else {
            props.globalcanvas();
        }
    }
    return (
        <div style={{
            backgroundColor:"lightblue",
            width:"40%",
            margin:"auto",
            textAlign:"center"
        }}>
            <div>
                <h2>Home Page</h2>
                <button name="privatecanvas" onClick={onSubmit} className="btn btn-secondary" style={{marginRight:5}}>Private canvas</button>
                <button name="globalcanvas" onClick={onSubmit} className="btn btn-secondary" style={{marginRight:5}}>Global canvas</button>
            </div>
        </div>
    )
}

export default HomePage;
