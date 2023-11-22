import React from "react";

import {    Container, 
            Col, 
            Row, 
            Card, 
            CardBody, 
            Form,
            FormGroup } from "reactstrap";
import SingleIngredient from "./SingleIngredient";
import DropdownHandler from "../Helpers/DropdownHandler";

function IngredientList({ingredientList, setIngredientList}){

    
    // this controls all the ingredients currently in the list and the modifications to 
    // the portions of each ingredient should be done in here.
    console.log('ingredientList', ingredientList);

    return(
        <Container className="ingredient-list">
          {ingredientList.length != 0 ?  <Row>
                <Col xs="6">
                </Col>
                <Col xs="2" className="ingredient-header">
                    amount
                </Col>
                <Col xs="4" className="ingredient-header">
                    unit
                </Col>
            </Row> : null}
            <>
            {ingredientList && Object.entries(ingredientList).map(([key, ingredient])=> <SingleIngredient   key={key} 
                                                                                                            ingredientData={ingredient} 
                                                                                                            setIngredientList={setIngredientList} 
                                                                                                            ingredientList={ingredientList}/> )}
            </>
        </Container>
    );
}

export default IngredientList;
