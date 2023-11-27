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
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../ContextProvider/AuthContext";
import KuaApi from "../APIHelper/KuaAPI";
import "./RecipeFull.css";

function RecipeFull(){
    
    const [ currentRecipe, setCurrentRecipe ] = useState("");
    const { recipeID } = useParams();
    const { userInfo } = useContext(AuthContext);
    
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
                        <Link to={`/user/${currentRecipe.user.id}`}>
                            <CardImg className="user-img rounded-circle" src={currentRecipe.user.urlImage || process.env.PUBLIC_URL + "/Not_found_user.jpg"}
                                            alt="user image" />
                        </Link>
                    </Col>                
                    <Col >
                        <Link className="user-name" to={`/user/${currentRecipe.user.id}`}>
                            {currentRecipe.user.username}
                        </Link>
                    </Col>    
                </Row>
            <CardBody>
                <CardTitle className="title">{currentRecipe.title}</CardTitle>
                <CardText className="description-text">"{currentRecipe.description}"</CardText>
                <hr/>
                <Row className="pb-3">
                    <Col xs="6">
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
                    </Col>
                    <Col xs="6">
                            <CardImg className="card-img" src={currentRecipe.urlImage || process.env.PUBLIC_URL + "/Not_found_recipe.jpg"}
                                                alt="recipe image" />
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