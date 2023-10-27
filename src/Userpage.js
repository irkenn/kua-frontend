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
import "./Userpage.css";
import RecipeCard from "./RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Userpage(){

    const [ currentUser, setCurrentUser ] = useState("");
    const { userID } = useParams();
    const { userInfo, changeUserInfo } = useContext(AuthContext);

    useEffect( () => {

        async function getUserInfo(){
            
            const response = await KuaApi.getUser(userID, userInfo);
            setCurrentUser(response);
            console.log("This is current user from the component", currentUser);
        }
        getUserInfo();
    }, []);
        
    const navigate = useNavigate();

    const goBackFunction = () => {
        navigate(-1);
    };
    console.log("This is current user from the component", currentUser);
    return(
        <Container>
        { currentUser ? (
            <>
                <Card className="mini-card mt-4">
                    <Row>
                        <Col xs="4">
                            <CardImg className="big-user-img rounded-circle m-2" 
                                        src={currentUser.urlImage || process.env.PUBLIC_URL + "/Not_found_user.jpg"}
                                        alt="user image" />
                        </Col >
                        <Col xs="8">
                            <Row className="mt-2">
                                <Col>
                                    <CardTitle className="title-1" >{currentUser.username}</CardTitle>
                                </Col>
                                <Col className="text-center">
                                    <Row className="big-number">{currentUser.recipes.length}</Row>
                                    <Row className="info-text">recipes</Row>
                                </Col>
                            </Row >
                            <Row  className="description-text ">
                                    {currentUser.bioInfo}
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Col className="mt-2">
                    <a className="edit-link mx-3" href={`/user/${currentUser.id}/edit`}><FontAwesomeIcon icon={faCog}/>Edit</a>
                </Col>
              
                <hr className="my-2 text-center"/>
                <Container  className="results-container">
                {/* { searchResults ? <h4 className="handwritten">Here are the results of your search</h4> : null } */}
                    { currentUser.recipes ? (currentUser.recipes.map( (recipeInfo ) => <RecipeCard recipeInfo={recipeInfo} key={recipeInfo.id} />)) : null}
                </Container>
            </>
            ): (
                    <h1>
                        Loading...
                    </h1>
                ) }

        </Container>
    );
}

export default Userpage;