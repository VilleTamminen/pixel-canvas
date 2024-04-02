import { useState } from "react";

const LoginPage = (props) => {

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
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(state.username.length < 4 || state.password.length < 8){
            props.setError("Username must be atleast 4 and password 8 characters long.")
            return;
        }
        let user = {
            ...state
        }
        if(event.target.name === "register"){
            props.register(user);
        }
        else {
            props.login(user);
        }
    }
    return (
        <div style={{
            backgroundColor:"lightblue",
            width:"40%",
            margin:"auto",
            textAlign:"center"
        }}>
            <form className="m-3">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            onChange={onChange}
                            value={state.username}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            onChange={onChange}
                            value={state.password}/>
                </div>
                <button name="register" onClick={onSubmit} className="btn btn-secondary" style={{marginRight:5}}>Register</button>
                <button name="login" onClick={onSubmit} className="btn btn-secondary" style={{marginRight:5}}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;
