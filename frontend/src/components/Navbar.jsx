import {Link} from 'react-router-dom';

const NavBar = (props) => {
    //jos on logged in, näytä canvas app. 
    /*
        <li className='nav-item' style={{marginLeft:10}}>
            <Link to="/deleteUser" className='nav-link' >Delete user account</Link>
        </li>
    */
    if(props.isLogged){
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <p className='navbar-brand' style={{marginLeft:10}}>Canvas App</p>
                <ul className='navbar-nav'>
                    <li className='nav-item' style={{marginLeft:10}}>
                        <Link to="/" className='nav-link'>Home page</Link>
                    </li>
                    <li className='nav-item' style={{marginLeft:10}}>
                        <Link to="/global" className='nav-link'>go to Global canvas</Link>
                    </li>       
                    <li className='nav-item' style={{marginLeft:10}}>
                        <Link to="/canvas" className='nav-link'>go to Private canvas</Link>
                    </li>  
                    <li className='nav-item' style={{marginLeft:10}}>
                        <p className='nav-item' style={{color:"blue"}}>Logged in as {props.user}</p>
                    </li>
                    <li className='nav-item' style={{marginLeft:10}}>
                        <Link to="/" className='nav-link' onClick={props.logout}>Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <p className='navbar-brand' style={{marginLeft:10}}>Canvas App</p>
            </nav>
        )
    }
}

export default NavBar;
