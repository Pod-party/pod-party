import React, { useState } from 'react';
// import { Switch, Route } from 'react-router-dom';
import { CreateContext } from 'react';
import LoginContainer from './LoginContainer.jsx';
import ClubPageContainer from './ClubPageContainer.jsx';
import HomePageContainer from './HomePageContainer.jsx';

// export const UserContext = createContext();

const MainContainer = () => {

  return (
    <div>
      {/* <UserContext.Provider> */}
      <LoginContainer />
      <HomePageContainer />
      <ClubPageContainer />
      {/* </UserContext.Provider> */}
    </div>
  )
};

export default MainContainer;