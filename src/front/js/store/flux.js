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
			login:[],
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
			login: async (email, password) => {
                try {
				const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					let data = await response.json()
					if (response.status === 200) {
						localStorage.setItem("token", data.access_token);
						return true;
					} else {
						return false
					}
				} catch (error) {
					return false;
				}
				
			},
			
			signOut: () => {
				localStorage.removeItem('token');
			 	setStore({storeToken: null 
			 	});
			 },
			signup: async (email, password) => {
                try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					let data = await response.json()
					if (response.status === 201) {
						localStorage.setItem("token", data.access_token);
						return "success";
					} else if (response.status === 409) {
						return "email_exist";
					} else {
						return "incomplete_data"
					}
				} catch (error) {
					return false;
				}
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
		}
	};
};

export default getState;