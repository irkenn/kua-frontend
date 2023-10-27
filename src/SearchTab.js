import React, { useState, useContext } from "react";
import { Redirect, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import KuaApi from "./KuaAPI";
import RecipeCard from "./RecipeCard";
import "./SearchTab.css";

import {    Container, 
            Col, 
            Row, 
            Card, 
            CardBody, 
            Form,
            FormGroup,
            Label,
            Input } from "reactstrap";

function SearchTab(){

    const [ formData, setFormData ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);
    const {userInfo, changeUserInfo} = useContext(AuthContext);
  
    const handleSubmit = async(e) => {
        //Prevents reloading of the page and similar behaviours
        e.preventDefault()
        // Retrieve each value from the submitted form
        
        if ( !formData ){
            alert("Please place a keyword in the search field");
            return;
        }
        try{
            // signUp method add the user to the database and creates a Token
            
            const response = await KuaApi.search( formData, userInfo );
            console.log("This is searchResults", searchResults);
            setSearchResults(response);
            //Resets the field in the form
            setFormData("");
        
        }catch(err){
            console.log("This is the err", err);
            alert(err);
        }
    }
    return (
        <div>
            <Container className="form-container m-3" >
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <button>Search</button>
                        <input 
                            className="search-input"
                            type="text"
                            name="formData"
                            value={formData}
                            placeholder="type a recipe name here"
                            onChange = { (e) => setFormData(e.target.value)}
                            />
                    </FormGroup>
                </Form>
            </Container>
            <Container  className="results-container">
                {/* { searchResults ? <h4 className="handwritten">Here are the results of your search</h4> : null } */}
                { searchResults ? searchResults.map( (recipeInfo ) => <RecipeCard recipeInfo={recipeInfo} key={recipeInfo.id} />) : null}
            </Container>
        </div>
    )
}

export default SearchTab;