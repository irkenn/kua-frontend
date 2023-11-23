import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./HomePages/Home";
import LoginForm from "./User/LoginAndEdits/LoginForm";
import SignupForm from "./User/SignUp/SignupForm";
import Logout from "./User/Auth/Logout";
import SearchTab from "./SearchRecipes/SearchTab";
import RecipeFull from "./SearchRecipes/RecipeFull";
import Userpage from "./User/Userpage";
import EditForm from "./User/LoginAndEdits/EditForm";
import SearchResult from "./SearchRecipes/SearchResult";
import AddRecipe from "./AddRecipes/AddRecipe";
import NotFound from "./NotFound";

function AppRoutes(){


    return(
        <Routes>
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/search/:keyword" element={<SearchResult />} />
            <Route exact path="/search" element={<SearchTab />} />
            <Route exact path="/recipe/:recipeID" element={<RecipeFull />} /> 
            <Route exact path="/user/:userID/edit" element={<EditForm />} />
            <Route exact path="/user/:userID" element={<Userpage />} /> 
            <Route exact path="/recipe/add" element={<AddRecipe />} />
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={ <NotFound />} />
        </Routes>
    );
}

export default AppRoutes;