import { string } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			storeToken: false,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			isAuthenticated: (token) =>{
				const options = {
					method: 'POST',
					headers:{
						"Content-Type": "application/json",
						"Authorization": 'Bearer '+token
					},
					body: JSON.stringify({})
				}
				
				//console.log(options.headers.Authorization)    
			
				fetch(process.env.BACKEND_URL + "/api/private", options)
				.then(response => {
					if (response.status === 200){

						response.json()}
						else{
							throw Error("There was a problem in the login request")
						}
					})
				.then(response => setStore({storeToken: true}))
				.catch(error => console.log('error', error));
			},
			signOut: ()=>{
				setStore({storeToken: null})
			}
		}
	};
};

export default getState;