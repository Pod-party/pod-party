import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import NewClub from './NewClub.jsx';
import ClubPageContainer from '../containers/ClubPageContainer.jsx';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';

const HomePage = (props) => {

  const [newClub, addNewClub] = useState('');
  const [clubs, setClubs] = useState([]);

  const addClub = () => {
    const copy = [...clubs];
    copy.push(newClub);
    setClubs(copy);
  };

  const routesArray = [];
  const clubsArray = [];
  const linksArray = [];
  for (const club of clubs) {
    routesArray.push(
      <Route exact path={`/${club}`}>
        <ClubPageContainer name={club}/>
      </Route>);
    clubsArray.push(<NewClub name={club} />);
    linksArray.push(
      <div>
        <Link to={`/${club}`}>{club}</Link>
      </div>);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch('club/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({

        newClub
      })
    })
      .then((res) => res.json())
      .catch(res => console.log('Error in sending group', res));
  };

  const handleClub = (e) => {
    // console.log(e.target.value);
    addNewClub(e.target.value);
  };

  return (

    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="GroupForm" method="POST" action="/club/add" onSubmit={handleSubmit}>
          <TextField label='club' name='club' variant="outlined" onChange={handleClub}></TextField>
          <Button type="button" variant="outlined" onClick={() => addClub()}>Add Club</Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Router>
          {linksArray}
          <Switch>
            {routesArray}
          </Switch>
        </Router>
      </Box>
    </div>
  );
};

export default HomePage;