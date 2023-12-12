import React from "react";

import {    Container, 
            Col, 
            Row } from "reactstrap";
import SingleIngredient from "./SingleIngredient";


function IngredientList({ingredientList, setIngredientList}){

    
    // this controls all the ingredients currently in the list and the modifications to 
    // the portions of each ingredient should be done in here.
    console.log('ingredientList', ingredientList);

    return(
        <div className="ingredient-list py-2">
          {ingredientList.length !== 0 ?  <Row>
                <Col xs="5">
                </Col>
                <Col xs="3" className="ingredient-header">
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
        </div>
    );
}

export default IngredientList;
