import React from "react";
import "./Home.css";
import {    Container, 
            Col } from "reactstrap";
import { Link } from 'react-router-dom';

function LogoutHome(){
    //This is the landing page when the browser doesn't detect any user info
    return(   
        <Container className="Homediv">
            <Col md={{ size: 8}} lg={{size:5, offset:12}} className="mt-5 inside-div">  
                <Container className="kuaInfo">
                    <Container className="p-4 my-4">
                        <h3 className="p-2" > <span className="miniTitle">Kúa</span> <span className="subTitle">[:/kwa/]</span></h3>
                        <p className="introText">The importance of food in Mesoamerican culture is reflected in the Nahuatl language, where the act of eating is described through the suffix of "kúa". </p>
                    </Container>
                </Container>
                <Container className="CenterDiv">
                    <h4 className="handwritten"> "Sign up to become a member" </h4>
                    <Link to="/signup" className="btn btn-primary home-button px-5 my-1">Sign up!</Link> 
                    <h4 className="handwritten mt-4" >or login if you are already one</h4>
                    <Link to="/login" className="btn btn-secondary home-button px-4">Login</Link>
                </Container>
            </Col>
        </Container>
    );
}

export default LogoutHome;