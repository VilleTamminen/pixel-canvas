import useAction from "./hooks/useAction";
//import ShoppingForm from "./components/ShoppingForm";
//import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import {Routes,Route,Navigate} from 'react-router-dom';
import GlobalCanvas from  "./components/GlobalCanvas";
import HomePage from "./components/HomePage";
import SquareForm from "./components/SquareForm";

//Kopio react/50_shopping_app/02_stage_login
//frontend: npm install react
//tässä versiossa ei ole Redux

function App() {

	//const {state,addItem,removeItem,editItem,register,login,logout,setError,getList} = useAction();
    const {state,addItem,removeItem,editItem,register,login,logout,setError,getList,    getSquareList,addSquareGlobal,editGlobalSquare,editPrivateSquare} = useAction();

	let message = <></>
	if(state.loading) {
		message = <h4>Loading ...</h4>
	}
	if(state.error) {
		message = <h4>{state.error}</h4>
	}
    //Jos on logged in, näytä Canvas. Muuten näytä LoginPage.
    if(state.isLogged) {
		return (
			<>
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user}/>
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<HomePage />}/>
                    <Route path="/form" element={<SquareForm addSquareGlobal={addSquareGlobal}/>}/>
                    <Route path="/global" element={<GlobalCanvas squareList={state.squareList} getSquareList={getSquareList} editSquare={editGlobalSquare} />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return (
			<>
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user}/>
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage login={login} register={register} setError={setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}

}

export default App
