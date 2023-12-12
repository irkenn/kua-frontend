import React from "react";
import "./NutritionalInfo.css";
import {    Container, 
    Card, 
    CardImg,
    CardTitle,
    CardBody, 
    CardText,
    Col,
    Row, 
    Button } from "reactstrap";

function NutritionalInfo({currentRecipe}){

    return(
        <Container className="mx-1 mb-4 nutrition-info-container">
            <hr className="medium-line"/>
            <Row >
                <div className="ultra-big-font">
                    Nutrition facts
                </div>
            </Row>
            <Row className="medium-weight-font">
                <Col>{currentRecipe.servings} servings per recipe</Col>
            </Row>
            <Row>
                <Col>Total recipe calories <span className="font-weight-bolder">{currentRecipe.calCount}</span>kcal</Col>
            </Row>
            <hr className="thick-line"/>
            <Row className="small-weight-font">
                <Col>Amounts per serving</Col>
            </Row>
            <Row className="extra-big-font">
                <Col >Calories</Col><Col className="text-end medium-weight-font">{currentRecipe.calPerServing} kcal</Col>
            </Row>
            <hr/>
            <Row>
                <Col>Total Fat</Col><Col className="text-end medium-weight-font">{currentRecipe.fatPerServing}g</Col>
            </Row>
            <Row>
                <Col>Proteins</Col><Col className="text-end medium-weight-font">{currentRecipe.proteinPerServing}g</Col>
            </Row>
            <Row>
                <Col>Carbohydrates</Col><Col className="text-end medium-weight-font">{currentRecipe.carbohydratesPerServing}g</Col>
            </Row>
            <Row>
                <Col>Fiber</Col><Col className="text-end medium-weight-font">{currentRecipe.fiberPerServing}g</Col>
            </Row>
            <hr className="medium-line"/>
        </Container>
    )
}

export default NutritionalInfo;