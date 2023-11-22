import React, { useContext, useEffect } from "react";
import "./Home.css";
import AuthContext from "../ContextProvider/AuthContext";
import {    Container, 
            Col } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import LogoutHome from "./LogoutHome";
import LoginHome from "./LoginHome";

function Home({isLogin}){
    
    const { userInfo, changeUserInfo } = useContext(AuthContext);

    console.log('userInfo', userInfo);

    return(
        
        <Container className="Homediv">
            { userInfo ? <LoginHome/> : <LogoutHome /> }
        </Container>
        
    );

}

export default Home;