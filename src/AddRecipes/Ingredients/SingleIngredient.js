import React, { useState } from "react";
import "./SingleIngredient.css";
import {    Container, 
            Col, 
            Row  } from "reactstrap";
import DropdownPossibleUnits from "../Helpers/DropdownPossibleUnits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';


function SingleIngredient({ingredientData, ingredientList, setIngredientList}){
    
    const { id, name, possibleUnits } = ingredientData;
    
    const [ amountUnit, setAmountUnit ] = useState({});

    const deleteIngredient = (id) => {
        //This takes the id, locates the ingredient from the list and deletes it
        const updatedList = {...ingredientList}
        delete updatedList[id];
        setIngredientList(updatedList);
    }

    const modifyIngredient = (e, inputKey) => {
        //Tracks the amount in the state
        setAmountUnit({ 
            ...amountUnit,
            [inputKey]: e.target.value,
        });

        const newList = {...ingredientList};
        newList[id].amount = e.target.value;
        setIngredientList(newList); 
    }
    

    return(
        <Container className="single-ingredient my-2 py-1" >
            <Row className="d-flex align-items-center">
                <Col xs="1" className="icon-container center">
                    <FontAwesomeIcon className="add-minus-icon mx-2" icon={faMinusCircle} onClick={()=> deleteIngredient(id)}/>
                </Col>
                <Col xs="5" className="ingredient-name center">
                    {name}
                </Col>
                <Col xs="2" className="center">
                    <input
                        className="amount-input"
                        type="text"
                        value={amountUnit.amount}
                        onChange={(e) => modifyIngredient(e, 'amount')}
                        />
                </Col>
                <Col xs="4" className="center">
                    <DropdownPossibleUnits id={id} units={possibleUnits} ingredientList={ingredientList} setIngredientList={setIngredientList}/>
                </Col>
            </Row>
        </Container>
    );
}

export default SingleIngredient;