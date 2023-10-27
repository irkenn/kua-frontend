import React, { useContext, useEffect } from "react";
import "./Home.css";
import AuthContext from "./AuthContext";
import {    Container, 
            Col } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import LogoutHome from "./LogoutHome";

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