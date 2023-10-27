import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import AuthContext from "./AuthContext";

import "./Navbar.css";

function AppNavbar(){

    //Retrieves the user information 
    const { userInfo, changeUserInfo } = useContext(AuthContext);
    const [ navbarItems, setNavbarItems ] = useState([]);    

    useEffect( () =>{
        function updateNavBar(){
            let arr = []
            if (userInfo?.username){
                arr.push(
                    {label: "Search", path:"/search"},
                    {label: "Home", path:"/"},
                    {label: "Profile", path:`/user/${userInfo.id}`},
                    {label: "Logout", path:"/logout"}
                )
            }else{
                arr.push(
                    {label: "Login", path: "/login"},
                    {label: "Sign up", path: "/signup"}
                )
            }
            setNavbarItems(arr);
        }
        updateNavBar();
    }, [userInfo]);
    

    return (
        <div>
             <Navbar expand="xl">
                <NavLink  exact="true" to="/" className="navbar-brand"><span className="bigText">Kúa</span><span className="subText">food app</span></NavLink>
                <Nav className="ml-auto d-flex align-items-center" navbar>
                    <div className="d-flex">
                        {navbarItems.map((item) => (<NavItem key={item.path} className="mr-3 mx-2 nav-item">
                                                        <NavLink className="nav-link" to={item.path}>{item.label}</NavLink>
                                                    </NavItem>))}
                    </div>    
                </Nav>
            </Navbar>
        </div>

    );

}

export default AppNavbar;