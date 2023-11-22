import React, { useState, useContext, useEffect } from "react";
import {    Container, 
            Col, 
            Row,
            Button, 
            Card, 
            CardBody, 
            Form,
            FormGroup, 
            CardImg} from "reactstrap";
import "./IngredientSelect.css";


function IngredientSelect({ingredientData, setIngredientInfo}){
    //Creates an 
    const { id, name, image} = ingredientData;
    const [ isClicked, setIsClicked ] = useState(false);
    const [ showAddButton, setShowAddButton ] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setShowAddButton(true);

    }

    return(
            <Container className={`ingredient-check-box my-2 ${isClicked ? 'clicked': ""}`} onClick={handleClick}>
                <Row className="ingredient-row">
                    <Col xs="3" className="img-container m-2">
                        <CardImg    className="ingredient-img"
                                    src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`} />
                    </Col>
                    <Col xs="5">
                        <label  className="form-check-label" 
                                for="flexRadioDefault1">
                        {name}
                        </label>
                    </Col>
                    <Col className="select-container">
                        {showAddButton && (<Button onClick={()=> setIngredientInfo(id)}>
                        Add
                        </Button>)}
                    </Col>
                </Row>
                
            </Container>
    ); 

}

export default IngredientSelect;