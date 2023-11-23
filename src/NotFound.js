import React from "react";
import {    Container, 
            Col,
            Row } from "reactstrap";
import { Link } from 'react-router-dom';
import "./NotFound.css";

function NotFound(){
    
    
    return(
        <Container>
            <Col md={{ size: 8}} lg={{size:5, offset:12}} className="mt-5 inside-div">
                <Container className="text-center">
                    <Row className="big-letters">
                        Not found
                    </Row>
                    <Row className="info-letters my-3">
                        Invalid url address or resource click here to go back to homepage
                    </Row>
                    <Link to="/" className="btn btn-secondary home-button px-4">Back to homepage</Link>
                </Container>
            </Col>
        </Container>);
}

export default NotFound;