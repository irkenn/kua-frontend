import React, { useContext, useEffect } from "react";
import "../../HomePages/Home.css";
import AuthContext from "../../ContextProvider/AuthContext";
import { useNavigate } from 'react-router-dom';

function Logout(){
    //This is the piece of state that holds user information and the function to set it.
    const { userInfo, changeUserInfo } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() =>{
        //Eliminates the credentials from localStorage and state
        changeUserInfo("");
        localStorage.removeItem("kuaUser");
        console.log("Logout of the session", "userInfo", userInfo);
        navigate('/');
    }, []);

}

export default Logout;