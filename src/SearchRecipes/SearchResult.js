import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../ContextProvider/AuthContext";
import KuaApi from "../APIHelper/KuaAPI";
import RecipeCard from "./RecipeCard";
import SearchTab from "./SearchTab";
import "./SearchTab.css";
import { Container } from "reactstrap";

function SearchResult(){

    const { keyword } = useParams();
    const {userInfo} = useContext(AuthContext);
    const [ searchResults, setSearchResults ] = useState([]);

    useEffect( () =>{
        //Fetches the information and renders the page
        async function searchKeyword(){
            try{
                const response = await KuaApi.search( keyword, userInfo );
                setSearchResults(response);

            }catch(err){
                alert(err); 
            }
        }
        searchKeyword();
    }, [keyword]);
    
    return (
        <>
            <SearchTab />
            <Container  className="results-container">
                { searchResults ? <h4 className="handwritten"> Here are the results of you search "{keyword}"</h4> : null }
                { searchResults ? searchResults.map( (recipeInfo ) => <RecipeCard recipeInfo={recipeInfo} key={recipeInfo.id} />) : <h5 className="handwritten">Your request didn't produced any results</h5>}
            </Container>
        </>
    );
}

export default SearchResult;