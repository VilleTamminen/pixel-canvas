import {Link} from 'react-router-dom';

const HomePage = (props) => {
    
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
                <h2>Welcome to pixel canvas</h2>
                <br/>
                <button className="btn btn-secondary" style={{marginRight:"10px"}}>
                    <li className='nav-item' style={{listStyle:"none"}}>
                        <Link to="/global" className='nav-link'>Global canvas</Link>
                    </li>  
                </button>
                <button className="btn btn-secondary"style={{marginLeft:"10px"}}>
                    <li className='nav-item' style={{listStyle:"none"}}>
                        <Link to="/canvas" className='nav-link'>Local storage canvas</Link>
                    </li>  
                </button>
                <br/><br/><br/>
            </div>
        </div>
    )
}

export default HomePage;
