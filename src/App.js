import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthContext from './ContextProvider/AuthContext';

import { BrowserRouter } from "react-router-dom";

import Navbar from './NavBar/Navbar';
import AppRoutes from './AppRoutes';

function App() {
  
  /** kuaUser is an object that contains all the relevant information for the app to run
   * kuaUser = {username, id, token} it is stored in State and passed through the context. */

  const [ userInfo, setUserInfo ] = useState( ()=>{
    let kuaUser = "";
    // If there's info about the user in the local storage, add it to the state
    const toString = localStorage.getItem("kuaUser");
    if(toString){
      kuaUser = JSON.parse(toString);
    }
    return kuaUser;
  });

  const changeUserInfo = ( newUserInfo ) => {
    //Checks if the three variables are passed and updates localStorage and state   
    const { username, id, token } = newUserInfo || {};
    
    if ( username && id && token ){
      //Adds the user info to the localStorage and to the state
      const userInfoToString = JSON.stringify({ username, id, token });
      setUserInfo({ username, id, token });
      localStorage.setItem("kuaUser", userInfoToString);
    }else {
      console.debug("Deleted user credentials");
      setUserInfo(undefined);
    }
  };
  
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContext.Provider value={{userInfo, changeUserInfo}}>
        <Navbar/>
        <AppRoutes/>
      </AuthContext.Provider>  
      </BrowserRouter>
    </div>
  );
}

export default App;
