import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../ContextProvider/AuthContext";
import KuaApi from "../APIHelper/KuaAPI";
import "./AddRecipe.css";
import {    Container, 
            Col, 
            Row, 
            Card, 
            CardBody, 
            Form,
            FormGroup } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import DropdownHandler from "./Helpers/DropdownHandler";
import IngredientModal from "./Ingredients/Modal/IngredientModal";
import IngredientList from "./Ingredients/IngredientList";


function AddRecipe(){

    const initialState = {  userId: "",
                            title: "",
                            preparation: "",
                            description: "",
                            servings: "",
                            urlImage: "", };

    const { userInfo } = useContext(AuthContext);
    const [ formData, setFormData ] = useState(initialState);
    
    //Holds the ingredients that will be added once the recipe is created
    const [ showIngredientModal, setShowIngredientModal ] = useState(false);
    const [ ingredientList, setIngredientList ] = useState([]);
    const navigate = useNavigate();
    
    //################## Modal related code ##################
    const toggleModal = () => {
        setShowIngredientModal(!showIngredientModal);
    };
    //################## end of modal related code ##################
    

    //################## ingredientsList related code ##################
    const setIngredientInfo = async(id) =>{
        //Preserves the 'id' variable across the renders
        
        // *** This is gonna be under revision, it might not be needed
        //setCurrentIngredient(id);
        
        //Retrieves the detailed ingredient info from the API
        const newIngredient = await KuaApi.getIngredientDetails(id, userInfo);
        toggleModal();
        //Adds it to the ingredient list
        setIngredientList( (ingredientList) => ({ 
                        ...ingredientList,
                        // newIngredient.id is a variable, it is required to use square brackets [] to dynamically compute the property key at runtime 
                        [newIngredient.id]:{...ingredientList.id, ...newIngredient},
                        }));
                        
        // setIngredientList((ingredientList) => [...ingredientList, newIngredient]);
        console.log('ingredientList', ingredientList);
    };

    //################## end of ingredientsList related code ##################
    
    useEffect( () => {
        // Populates the form with the user info
        async function getUserID(){
            const { id } = userInfo;
                //If there's an Id will incorporate it to the form, else will redirect so user can authenticate
                if(id){
                    setFormData(data => ({
                    ...data,
                    userId:id,
                    }));
                }
                else{navigate('/')};       
        }
        getUserID();
    }, []);

    const handleFormChange = e => {        
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]:value
        }))
    };
    
    async function handleSubmit(e) {
        //Prevents reloading of the page and similar behaviours
        e.preventDefault();
        // Retrieve each value from the submitted form
        const { title, description, preparation, servings } = formData;

        //This block of code checks for empty fields in the form
        if (!title || !description || !preparation || !servings) {
            alert("Please fill all the fields to update changes");
            return;
        }
        if (!ingredientList) {
            alert("Please add ingredients to the recipe");
            return;
        } else {
            for (const ingredientId in ingredientList) {
                const ingredient = ingredientList[ingredientId];
                //Each ingredient must have a 'unit' and 'value'
                if (!ingredient.hasOwnProperty('unit') || !ingredient.hasOwnProperty('amount')) {
                    alert(`Please fill the required fields for ingredient "${ingredient.name}"`);
                    return;
                }
            }
        }
        try {
            //Uploads the recipe to the API
            const newRecipe = await KuaApi.newRecipe(formData, userInfo);

            let newIngredients = "";
            // To add the ingredients the API requires the recipe Id "
            if (newRecipe && newRecipe.id) {
                console.log('yesyesyesyesyesyes');
                newIngredients = await KuaApi.addIngredients(ingredientList, newRecipe.id, userInfo);
            }
            // Takes the user to the created recipe page
            navigate(`/recipe/${newRecipe.id}`, { replace: true });

        } catch (err) {
            alert(err);
        }
    }


    return(
        <>
            {showIngredientModal && (<IngredientModal setIngredientInfo={setIngredientInfo} />)}
            <div className={showIngredientModal ? 'modal-overlay' : ''} onClick={() => toggleModal()}></div>
            <Container className='my-4'>
                <Row>
                <Col md={{ size: 8, offset:2}} lg={{size:6, offset:3}}>
                        <Card className="edit-card">
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                   <Row >
                                        <Col xs="8">
                                            <FormGroup>
                                                <input  className="form-control"
                                                        type="text"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleFormChange}
                                                        placeholder="type here your recipe name" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="4" className="d-flex">
                                            <button className="btn btn-primary flex-grow-1">Upload</button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Container className="ingredients-container">
                                            <h4 className="info-title">Ingredients</h4>
                                            <hr/>

                                            <IngredientList ingredientList={ingredientList} setIngredientList={setIngredientList}/>
                                            <button className="add-button btn-primary" 
                                                    type="button"
                                                    onClick={toggleModal}>
                                                <FontAwesomeIcon className="plus-icon mx-2" icon={faPlusCircle}/>
                                                Click to add an ingredient
                                            </button>
                                        </Container>
                                    </Row> 
                                    <Row>
                                        <h4 className="info-title mt-2">Preparation</h4>
                                        <Container>
                                            <textarea
                                                className="form-control preparation-field"
                                                name="preparation"
                                                value={formData.preparation}
                                                onChange={handleFormChange}
                                                placeholder="Describe here the preparation process here"
                                                rows={6} />
                                        </Container>
                                    </Row>
                                    <Row>
                                        <h4 className="info-title mt-2">Description</h4>
                                        <Container>
                                            <textarea 
                                                className="form-control description-field"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleFormChange}
                                                placeholder="Write a short description of your recipe"
                                                rows={4}
                                            />
                                        </Container>
                                    </Row>
                                    <Row>
                                        <h4 className="info-title mt-2">Servings</h4>
                                        <DropdownHandler 
                                            options={[1,2,3,4,5,6,7,8,9,10]} 
                                            customMessage={"Select a number"} 
                                            formName={"servings"}
                                            setFormData={setFormData} 
                                            formData={formData}/>
                                    </Row>
                                    <Row>
                                        <label className="info-title mt-2" >Picture URL</label> 
                                        <input  className="form-control"
                                                type="text"
                                                name="urlImage"
                                                value={formData.urlImage}
                                                onChange={handleFormChange} />
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                </Col>
                </Row>
            </Container> 
        </>
    );
}

export default AddRecipe;