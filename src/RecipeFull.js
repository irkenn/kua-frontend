import React, { useState, useContext, useEffect } from "react";
import "./SearchTab.css";
import {    Container, 
            Card, 
            CardImg,
            CardTitle,
            CardBody, 
            CardText,
            Col, 
            Row, 
            Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./AuthContext";
import KuaApi from "./KuaAPI";
import "./RecipeFull.css";



function RecipeFull(){
    
    const [ currentRecipe, setCurrentRecipe ] = useState("");
    const { recipeID } = useParams();
    const { userInfo, changeUserInfo } = useContext(AuthContext);
    
    useEffect( () =>{
        //Get's the infromation from the API
        async function getRecipeInfo(){
            const response = await KuaApi.getRecipe(recipeID, userInfo);
            setCurrentRecipe(response);
        }
        getRecipeInfo();
    }, []);

    const navigate = useNavigate();

    const goBackFunction = () => {
        navigate(-1);
    };
    
    return (
        <Container className="mt-5">

         { currentRecipe ? (
             <Card className="square-card my-4">
                <Row>
                    <Col xs="3">
                        <a href={`/user/${currentRecipe.user.id}`}>
                            <CardImg className="user-img rounded-circle" src={currentRecipe.user.urlImage || process.env.PUBLIC_URL + "/Not_found_user.jpg"}
                                            alt="user image" />
                        </a>
                    </Col>                
                    <Col >
                        <a className="user-name" href={`/user/${currentRecipe.user.id}`}>
                            {currentRecipe.user.username}
                        </a>
                    </Col>    
                </Row>
            <CardBody>
                <CardTitle className="title">{currentRecipe.title}</CardTitle>
                <hr/>
                <Row>
                    <Col xs="6">
                        <CardText className="description-text">"{currentRecipe.description}"</CardText>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <CardImg className="card-img" src={currentRecipe.urlImage || process.env.PUBLIC_URL + "/Not_found_recipe.jpg"}
                                                alt="recipe image" />
                        </Row>
                        <Row className="recipe-servings">
                            <span>{currentRecipe.calCount}</span> 
                            <span className="tiny-letter">kcal/serving</span>
                        </Row>
                        <Row className="recipe-servings">
                            <span>{currentRecipe.servings}</span> 
                            <span className="tiny-letter">servings</span>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <h4 className="info-title">
                        Ingredients
                    </h4>
                </Row>
                <Row>
                    <Container className="white-container mb-2">
                            {currentRecipe.ingredients[0].id ? 
                                (currentRecipe.ingredients.map((singleIngredient) => <CardText className="m-1" key={singleIngredient.id}>
                                                                                           ·{singleIngredient.amount} {singleIngredient.unit} of {singleIngredient.name}
                                                                                    </CardText>)
                                ) : <CardText className="info-text">"no current ingredients listed"</CardText> } 
                    </Container>
                </Row>
                <Row>
                    <h4 className="info-title">
                        Preparation
                    </h4>
                </Row>
                <Row>
                    <Container className="white-container mb-2">
                        <CardText className="info-text">
                            {currentRecipe.preparation ? currentRecipe.preparation: "no current ingredients listed" }
                        </CardText>
                    </Container>
                </Row>
                <Container className="button-container">
                <Button color="primary" onClick={goBackFunction} > Go Back!</Button>
                </Container>
            </CardBody>
            </Card> ):(    
                        <Container>
                             <h1>
                                Loading...
                            </h1>
                        </Container>)}
        </Container>
    );
}

export default RecipeFull;