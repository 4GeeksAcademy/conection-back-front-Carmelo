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
                    <img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T210A2PA4301PT17X13Y13D1017610462W30622H36747/views/1,width=550,height=550,appearanceId=2,backgroundColor=000000,noPt=true/yes-i-am-a-programmer-no-i-wont-fix-your-printer-mens-t-shirt.jpg" alt="..."/>                    
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