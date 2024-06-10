import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const [data, setData] = useState({});
    const [alertMessage, setAlertMessage] = useState()
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const handleChange = (event) =>{
        setData({...data, [event.target.name]: event.target.value});
    }
    const goLogIn = () =>{
        navigate("/login")
    }
    console.log(data)
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //console.log(data)
		fetch(process.env.BACKEND_URL + "/api/signup", config)
			.then((response) => response.json())
			.catch(error => console.log('error', error))
			.then(response => {
                //console.log(response)
				// response.token?
                //     actions.loadToken(response)
                // :
                console.log(response)
                if (response.message == "Email and password already exist") {
                    //console.log("Email and password are required")
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            Email and password already exist
                        </div>)
                    
                }if (response.message == "New user added") {
                    setInterval(goLogIn, 1000);
                    
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            User added success
                        </div>)
                }
                
			});
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e) => handleChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                onChange={(e) => handleChange(e)}/>
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
            {alertMessage}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    ); 
}