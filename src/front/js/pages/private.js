import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Private = () => {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    //console.log(token)

    useEffect(()=>{
        actions.isAuthenticated(token)
        
    }, [])
    const signOut = ()=>{
        actions.signOut();
        localStorage.removeItem('token');
        navigate("/");
    }
    if (store.storeToken) {
        return (
            //<h1>Hola</h1>
            <div className="container">
                <div className="card mb-3">
                    <img src="https://static.wixstatic.com/media/1061d9_aa94cd19e56b4ff1b333a448cb4affcd~mv2.jpg/v1/fill/w_602,h_364,al_c,lg_1,q_80/1061d9_aa94cd19e56b4ff1b333a448cb4affcd~mv2.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Congrats you pass the password and email check</h5>
                        <button type="submit" className="btn btn-primary" onClick={signOut}>Sign Out</button>
                    </div>
                </div>

            </div>
        )
    }else navigate("/error")
    //const { store, actions } = useContext(Context);
    // const options = {
    //     method: 'POST',
    //     headers:{
    //         "Content-Type": "application/json",
    //         "Authorization": 'Bearer '+token
    //     },
    //     body: JSON.stringify({})
    // }
    
    // console.log(options.headers.Authorization)    

    // fetch(process.env.BACKEND_URL + "/api/private", options)
    // .then(response => response.text())
    // .then(response => console.log(response))
    // .catch(error => console.log('error', error));
    
    return (<></>)
    
}