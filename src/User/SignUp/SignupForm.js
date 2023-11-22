import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../ContextProvider/AuthContext";
import KuaApi from "../../APIHelper/KuaAPI";
import "../Helpers/FormCard.css";
import {    Container, 
            Col, 
            Row, 
            Card, 
            CardBody, 
            Form,
            FormGroup } from "reactstrap";

function SignupForm(){

    const initialState = {
        username:"",
        email:"",
        bioInfo:"",
        urlImage:"",
        password:""
    };

    const [ formData, setFormData ] = useState(initialState);


    //Creates an object with the name of the each field and its corresponding value
    const handleFormChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]:value
        }))
    }

    //Using the context provider, call the function that updates the user info
    const {changeUserInfo} = useContext(AuthContext);
    //After the form is submitted, it will redirect the user to home using useNavigate.
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        //Prevents reloading of the page and similar behaviours
        e.preventDefault()
        // Retrieve each value from the submitted form
        const {
            username,
            email,
            password } = formData;
        
        if ( !username || !email || !password ){
            alert("Please fill the required fields");
            return;
        }
        
        try{
            // signUp method add the user to the database and creates a Token
            const response = await KuaApi.singUp( formData );
            //Update the info stored in state
            changeUserInfo(response);
            //Resets the field in the form
            setFormData(initialState);
            //Takes the user to the homepage
            navigate("/");
        }catch(err){
            alert(err);
        }
    }

    return(
        <div className="pt-3">
            <Container>
                <Row>
                    <Col md={{ size: 8, offset:2}} lg={{size:6, offset:3}}>
                        <h3>Sign up!</h3>
                        <Card>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input 
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleFormChange}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            className="form-control"
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            />
                                    </FormGroup>                                   
                                    
                                    <FormGroup>
                                        <label htmlFor="bioInfo" className="form-label">Bio info</label>
                                        <input 
                                            className="form-control"
                                            type="text"
                                            name="bioInfo"
                                            value={formData.bioInfo}
                                            onChange={handleFormChange}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="urlImage" className="form-label">Image URL</label>
                                        <input 
                                            className="form-control"
                                            type="text"
                                            name="urlImage"
                                            value={formData.urlImage}
                                            onChange={handleFormChange}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleFormChange}
                                            autoComplete="current-password" 
                                            />
                                    </FormGroup>
                                    <div className="d-grid">
                                        <button className="btn btn-primary my-3 p-2">Sign up!</button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div> 
    )
}


export default SignupForm;