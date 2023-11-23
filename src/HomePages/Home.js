import React, { useContext  } from "react";
import "./Home.css";
import AuthContext from "../ContextProvider/AuthContext";
import {    Container, 
            Col } from "reactstrap";
import LogoutHome from "./LogoutHome";
import LoginHome from "./LoginHome";

function Home(){
    
    const { userInfo } = useContext(AuthContext);

    return(
        
        <Container className="Homediv">
            { userInfo ? <LoginHome/> : <LogoutHome /> }
        </Container>
        
    );

}

export default Home;