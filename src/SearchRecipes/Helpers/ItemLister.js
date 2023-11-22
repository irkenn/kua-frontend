import React from "react";
import RecipeCard from "../RecipeCard";


function ItemLister({array}){
    // Item lister will tell if its a single ob
    console.log('ItemLister array', array);

    return(
        <div>
            { array.map( (recipeInfo ) => <RecipeCard recipeInfo={recipeInfo} />  )}
        </div>

    );
}

export default ItemLister;