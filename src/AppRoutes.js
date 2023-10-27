import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import SearchTab from "./SearchTab";
import RecipeFull from "./RecipeFull";
import Userpage from "./Userpage";
import EditForm from "./EditForm";

function AppRoutes(){


    return(
        <Routes>
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/search" element={<SearchTab />} />
            <Route exact path="/recipe/:recipeID" element={<RecipeFull />} /> 
            <Route exact path="/user/:userID/edit" element={<EditForm />} />
            <Route exact path="/user/:userID" element={<Userpage />} /> 
            <Route exact path="/" element={<Home />} />
            {/* <Route path="*" element={ <NotFound />} /> */}
        </Routes>
    );
}

export default AppRoutes;