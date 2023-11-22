import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchTab.css";
import {    Container, 
            Form,
            FormGroup } from "reactstrap";

function SearchTab(){

    const [ formData, setFormData ] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e) => {
        //Prevents reloading of the page and similar behaviours
        e.preventDefault()
        // Retrieve each value from the submitted form
        
        if ( !formData ){
            alert("Please place a keyword in the search field");
            return;
        }
        if (location.pathname.startsWith("/search")) {
            // If you're already on the search page, replace the current URL
            navigate(`/search/${formData}`, { replace: true });
        } else {
            // Navigate to the search page with the new URL
            navigate(`/search/${formData}`);
        }
    }

    return (
        <>
            <Container className="form-container mt-3 d-flex justify-content-center align-items-center" >
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="form-group-search px-2">
                            <button className="btn">Search</button>
                            <input 
                                className="search-input my-1 px-2"
                                type="text"
                                name="formData"
                                value={formData}
                                placeholder="type a recipe name here"
                                onChange = { (e) => setFormData(e.target.value)}
                                />
                        </FormGroup>
                    </Form>
            </Container>
        </>
    )
}

export default SearchTab;