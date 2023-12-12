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
import NutritionalInfo from "./NutritionalInfo";
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
                            <CardImg className="card-img" src={currentRecipe.urlImage || process.env.PUBLIC_URL + "/Not_found_recipe.jpg"}
                                                alt="recipe image" />
                </Row>
                <Row>
                    <NutritionalInfo currentRecipe={currentRecipe}/>
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