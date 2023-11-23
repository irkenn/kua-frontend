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
import "./EditForm.css";


function EditForm(){
    
    const initialState = {
        username:"",
        email:"",
        bioInfo:"",
        urlImage:"",
        password:""
    };


    const { userInfo } = useContext(AuthContext);
    const [ formData, setFormData ] = useState(initialState);

    useEffect( () => {
        // This will populate the form with the user info
        async function getUserInfo(){
            const {username, bioInfo, urlImage } = await KuaApi.getUser(userInfo.id, userInfo);
            if (username) {
                setFormData({username, bioInfo, urlImage });
            }
        }
        getUserInfo();
    }, []);
    

    //Creates an object with the name of the each field and its corresponding value
    const handleFormChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]:value
        }))
    }

    //Using the context provider, call the function that updates the user info
    
    //After the form is submitted, it will redirect the user to home using useNavigate.
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        //Prevents reloading of the page and similar behaviours
        e.preventDefault()
        // Retrieve each value from the submitted form
        const { email,
                password } = formData;
        
        if ( !email || !password ){
            alert("Please fill the required fields tu update changes");
            return;
        }
        
        try{ 
            console.log('formData', formData);
            
            const response = await KuaApi.updateUser( formData, userInfo);
            // console.log('response', response);
            // signUp method add the user to the database and creates a Token
            
            
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
                        <h3>Edit user info</h3>
                        <Card className="edit-card">
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <Container className="sub-card py-3 mb-2">
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
                                    </Container>
                                    <Row className="legend my-3">
                                        To apply changes please confirm email and password
                                    </Row>
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
                                        <button className="btn btn-primary my-3 p-2">Save changes</button>
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

export default EditForm;