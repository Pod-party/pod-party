/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ClubPageContainer from '../containers/ClubPageContainer.jsx';

const NewClub = (props) => {

  return (
    <div className='cardContainer'>
      <Router>
        <Link to={props.name}>
          {props.name}
        </Link>
      </Router>
    </div>
  );
};

export default NewClub;