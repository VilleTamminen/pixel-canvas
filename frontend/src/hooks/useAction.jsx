import {useState,useEffect} from 'react';

const useAction = () => {
	
	const [state,setState] = useState({
        squareList:[],
		list:[],
		isLogged:false,
		token:"",
		loading:false,
		error:"",
		user:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPERS FUNCTIONS
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if(state.isLogged) {
				//getList(state.token);
                getSquareList(state.token);
			}
		}
	},[])
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setUser = (user) => {
		setState((state) => {
			let tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const clearState = (error) => {
		let state = {
            squareList:[],
			list:[],
			isLogged:false,
			loading:false,
			token:"",
			error:error,
			user:""
		}
		saveToStorage(state);
		setState(state);
	}

	//USEEFFECT FETCH
    //ei saa olla async, mutta fetch vaatii että on async await. 
    //siksi on urlRequest, joka odottaa että arvot muuttuu.
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(!response) {
				clearState("Server never responded. Logging you out. Try again later");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":
						setError("Register success");
						return
					case "login":
						const loginData = await response.json();
						if(!loginData) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								isLogged:true,
								token:loginData.token
							}
							saveToStorage(tempState);
							return tempState;
						})
						//getList(loginData.token);
                        getSquareList(loginData.token)
						return;
					case "logout":
						clearState("");
						return;
                    case "deleteUser":   
                        clearState("");              
                        return;
                    case "getSquareList":
                        const squareData = await response.json();
						if(!squareData) {
							setError("Failed to get global canvas square data. Try again later!")
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								squareList:squareData
							}
							saveToStorage(tempState);
							return tempState;
						})
                        setError("Changed to global canvas");
						return;
                    case "editGlobal":
                        getSquareList();
                        //Edit kutsutaan GlobalCanvas->EditSquare. Täällä ei tarvi tehdä mitään.
                        return;
                    case "editPrivate":
                        setError("private canvas");
                        return;                      
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					clearState("Your session has expired. Logging you out.");
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							setError("Username is already in use");
							return;
						} else {
							setError("Register failed."+errorMessage);
							return;
						}
					case "login":
						setError("Login failed."+errorMessage);
						return;
					case "logout":
						clearState("Server responded with an error. Logging you out.");
						return;
                    case "deleteUser":
                        clearState("Server responded with an error. Logging you out.");
                        return;
                    case "getSquareList":
                        setError("Failed to get square list."+errorMessage);
                        return;
                    case "editGlobal":
                        setError("Failed to edit global canvas."+errorMessage);
                        return;
                    case "editPrivate":
                        setError("Failed to edit private canvas."+errorMessage);
                        return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	}, [urlRequest]);
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				"method":"POST",
				"headers":{
					"Content-type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				"method":"POST",
				"headers":{
					"Content-type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			action:"login"
		})
		setUser(user.username);
	}

	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				"method":"POST",
				"headers":{
					"token":state.token
				}
			},
			action:"logout"
		})
	}

    const deleteUser = () => {
        setUrlRequest({
			url:"/deleteUser",
			request:{
				"method":"DELETE",
				"headers":{
					"token":state.token
				}
			},
			action:"logout" //deleteUser = no function for deleting on client side.
		})
    }
    // CANVAS STUFF

    const getSquareList = (token) => {
        //jos token on annettu, käytä sitä. muuten state.token käytössä
		let tempToken = state.token;
		if(token) {
			tempToken = token;
		}
		//let url = "/api/place/squares";
        let url = "/api/place";
		setUrlRequest({
			url:url,
			request:{
				"method":"GET",
				"headers":{
					"token":tempToken
				}
			},
			action:"getSquareList"
		})
	}
    
    const editGlobalSquare = (square) => {
        //Ei etsitä objekti _id:n kautta vaan squaren oman id:n avulla.
        setUrlRequest({
            url:"/api/place/"+square.id,
            request:{
                "method":"PUT",
                "headers":{
                    "Content-type":"application/json",
                    "token":state.token
                },
                "body":JSON.stringify(square)
            },
            action:"editGlobal"
        })
    }
        
    const editPrivateSquare = (user,square) => {
        setUrlRequest({
            url:"/api/place/canvas/"+user._id +"/"+square._id,
            request:{
                "method":"PUT",
                "headers":{
                    "Content-type":"application/json",
                    "token":state.token
                },
                "body":JSON.stringify(square)
            },
            action:"editPrivate"
        })
    } 

	return {state,register,login,logout,setError,deleteUser,getSquareList,editGlobalSquare,editPrivateSquare}
}

export default useAction;