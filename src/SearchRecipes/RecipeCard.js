import React from "react";
import "./SearchTab.css";
import {    Card, 
            CardImg,
            CardTitle,
            CardBody, 
            Col, 
            Row } from "reactstrap";
import { Link } from 'react-router-dom';            

function RecipeCard({recipeInfo}){
    
    return (

         <Card className="square-card my-4">
            <CardBody>
                <CardTitle >
                    <Link className="title" to={`/recipe/${recipeInfo.id}`}>{recipeInfo.title}</Link>
                </CardTitle>
                
                <Row className="username-row mx-1"> 
                 { recipeInfo.user ? (<> posted by <Link className="username-row" to={`/user/${recipeInfo.user.id}`}> {recipeInfo.user.username} </Link> </>):(
                    null)}
                </Row>
                    <Link to={`/recipe/${recipeInfo.id}`}>
                        <CardImg src={recipeInfo.urlImage || process.env.PUBLIC_URL + "/Not_found_recipe.jpg"}
                                    alt="Recipe image" />
                    </Link>
                <Row className="my-2">
                    <Col xs="8" className="recipe-description" >"{recipeInfo.description}"</Col>
                    <Col xs="4" >
                        <Row className="recipe-servings">
                            <span>{recipeInfo.calPerServing}</span> 
                            <span className="tiny-letter">kcal/serving</span>
                        </Row>
                        <Row className="recipe-servings">
                            <span>{recipeInfo.servings}</span> 
                            <span className="tiny-letter">servings</span>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default RecipeCard;