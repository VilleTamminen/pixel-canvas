import { useState } from "react";

//ei valmis
const SquareForm = (props) => {

    const [state,setState] = useState({
        username:"",
        color:"ffffff",
        coordX:0,
        coordY:0,
        datetime:""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        //https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript 
        var currentdate = new Date(); 
        var datetimenow = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log("datetime:"+datetimenow);         //datetime:Last Sync: 1/4/2024 @ 20:49:43 

        let square = {
            ...state,
            [event.target.username]:event.target.username,
            [event.target.datetime]:datetimenow
        }
        
        //Error: props.addsquareGlobal is not a function
        props.addSquareGlobal(square);
        setState({
            username:"",
            color:"ffffff",
            coordX:0,
            coordY:0,
            datetime:""
        })
    }
        //<td> cannot appear as a child of <div>.
    return (
        <div style={{
            "backgroundColor":"pink",
            "margin":"auto",
            "width":"40%",
            "textAlign":"center"}}>
            <form className="m-3" onSubmit={onSubmit}> 
                <input type="text"
                    name="user"
                    id="user"
                    className="form-control"
                    onChange={onChange}
                    value={state.user}/>
                <input type="text"
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={onChange}
                    value={state.color}/>
                 <input type="number"
                    name="coordX"
                    id="coordX"
                    className="form-control"
                    onChange={onChange}
                    value={state.coordX}/>
                <input type="number"
                    name="coordY"
                    id="coordY"
                    className="form-control"
                    onChange={onChange}
                    value={state.coordY}/>
                <input type="date"
                    name="datetime"
                    id="datetime"
                    className="form-control"
                    onChange={onChange}
                    value={state.datetime}/>
                <input type="submit" value="Add" className="btn btn-secondary"/>
            </form>
        </div>
    )
}

export default SquareForm;
