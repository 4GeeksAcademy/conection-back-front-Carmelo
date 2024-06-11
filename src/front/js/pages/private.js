import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
// import penguinImage2 from "../../img/penguin2.png";
import { useNavigate } from "react-router-dom";



export const Private = () => {
   
    return (
		<div className="text-center mt-5">
			<p>
				<img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T210A2PA4301PT17X13Y13D1017610462W30622H36747/views/1,width=550,height=550,appearanceId=2,backgroundColor=000000,noPt=true/yes-i-am-a-programmer-no-i-wont-fix-your-printer-mens-t-shirt.jpg" style={{width:350}} />
			</p>
		</div>
	);
}