import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Error = () => {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
   
    
    return (
        <div className="container">
            <h4>Por favor Inicie sesión</h4>
                <div className="card mb-3">
                    <img src="https://www.fanisetas.com/images/png/5/8/3/583.png?712" className="card-img-top" alt="..." style={{ width: '400px', height: 'auto' }} />
                </div>

        </div>
    )
    
}