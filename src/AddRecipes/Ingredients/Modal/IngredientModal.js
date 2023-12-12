import React, { useState, useContext } from "react";
import "./IngredientModal.css";
import AuthContext from "../../../ContextProvider/AuthContext";
import KuaApi from "../../../APIHelper/KuaAPI";
import {    Container,
            Form,
            FormGroup,
            Row,
            Col } from "reactstrap";
import IngredientSelect from "./IngredientSelect";

function IngredientModal({ setIngredientInfo }){

    //Ingredient modal it's going to be a little form
    const [ currentIngredient, setCurrentIngredient ] = useState("");
    const [ resultList, setResultList ] = useState('');
    const {userInfo} = useContext(AuthContext);


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!currentIngredient){
            alert("Please fill the required fields tu update changes");
            return;
        }
        try{
            //Retrieves the results from the API
            const response = await KuaApi.searchIngredient(currentIngredient, userInfo);
            setResultList(response);
        }catch(err){
            alert(err);
        }
    };
    
    //Will make an API call and will render the result
    return(
        <Container className="mt-4 modal-container">
            <Col md={{ size: 8, offset:2}} lg={{size:6, offset:3}}>
                {resultList.length === 0 ? <h4 className="handwritten py-3">Type here the name or your ingredient</h4> : null}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="form-group-search px-2">
                                <Row>
                                    <button className="btn">Find ingredient</button>
                                </Row>  
                                <Row className="input-row">
                                    <input 
                                        className="search-input-ingredient my-1 px-3"
                                        type="text"
                                        name="currentIngredient"
                                        value={currentIngredient}
                                        placeholder="type here the ingredient name"
                                        onChange = { (e) => setCurrentIngredient(e.target.value)} />
                                </Row>
                        </FormGroup>
                    </Form>
                <Container className="results-container">
                    {resultList.length === 0 ? null : <><h4 className="handwritten"> Please select the ingredient that matches your query "{currentIngredient}"</h4><hr/></>}
                    {resultList && (<>         
                                        {resultList.map((ingredientData) => <IngredientSelect ingredientData={ingredientData} setIngredientInfo={setIngredientInfo}/> )}
                                    </>)}
                </Container> 
            </Col>
        </Container>
    );
}

export default IngredientModal;