import React, { useState, useContext, useEffect } from "react";
import {    Container, 
    Card, 
    CardImg,
    CardTitle,
    CardBody, 
    CardText,
    Col, 
    Row, 
    Button } from "reactstrap";
import { Link } from 'react-router-dom';
import AuthContext from "../ContextProvider/AuthContext";
import KuaApi from "../APIHelper/KuaAPI";
import SearchTab from "../SearchRecipes/SearchTab";
import RecipeCard from "../SearchRecipes/RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";

function LoginHome(){
    
    const [ homepageInfo, setHomepageInfo ] = useState("");
    const [ currentUser, setCurrentUser ] = useState("");
    const { userInfo, changeUserInfo } = useContext(AuthContext);

    useEffect( () => {
        //Get's the infromation from the API
        async function getHomepageInfo() {
            const response = await KuaApi.getHome( userInfo );
            setHomepageInfo(response);
        }
        async function getUserInfo(){
            const response = await KuaApi.getUser(userInfo.id, userInfo);
            setCurrentUser(response);
            console.log("This is current user from the component", currentUser);
        }
        getUserInfo();
        getHomepageInfo();
    }, []);
        
    return(
        <>
            { homepageInfo ? (  <Container>
                                    <Container className="search-tab">
                                        <SearchTab />
                                    </Container>
                                    <Container className="link-container">
                                      <a className="new-recipe-link" href={'/recipe/add'}><FontAwesomeIcon className="add-plus-icon mx-2" icon={faPlusCircle}/>  Add a new recipe</a>
                                    </Container>
                                    

                                    <Card className="mini-card my-3">
                                        <Row>
                                            <Col xs="4">
                                                <CardImg className="big-user-img rounded-circle m-2" 
                                                            src={currentUser.urlImage || process.env.PUBLIC_URL + "/Not_found_user.jpg"}
                                                            alt="user image" />
                                            </Col >
                                            <Col xs="7">
                                                <Row className="my-4">
                                                    <Col>
                                                        <CardTitle className="title-1 " >Hello again {currentUser.username}, we're glad to have you back</CardTitle>
                                                    </Col>
                                                </Row>   
                                            </Col>
                                        </Row>
                                    </Card>
                                    <hr/>
                                    { homepageInfo ? homepageInfo.map( (recipeInfo ) => <RecipeCard recipeInfo={recipeInfo} key={recipeInfo.id} />) : null}

                                </Container> ):(<Container>
                                                    <h1>
                                                        Loading...
                                                    </h1>
                                                    </Container>)}

        </>
    );
}

export default LoginHome;