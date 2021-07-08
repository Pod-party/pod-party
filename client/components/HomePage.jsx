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
  const [email, setEmail] = useState('');
  const [routesArray, setRoutesArray] = useState([]);
  const [clubsArray, setClubsArray] = useState([]);
  const [linksArray, setLinksArray] = useState([]);

  const addClub = () => {
    const copy = [...clubs];
    copy.push(newClub);
    setClubs(copy);
  };


  const renderClubs = (data) => {

    const tempRoutesArray = [];
    const tempClubsArray = [];
    const tempLinksArray = [];

    console.log('inside renderClubs ', data);
    for (const club of data) {
      // note: club is now an object with properties, club_id, club_name
      tempRoutesArray.push(
        <Route exact path={`/${data.club_name}`}>
          <ClubPageContainer name={data.club_name} clubId={data.club_id} />
        </Route>);
      tempClubsArray.push(<NewClub name={data.club_name} />);
      tempLinksArray.push(
        <div>
          <Link to={`/${data.club_name}`}>{data.club_name}</Link>
        </div>);
    }
    setRoutesArray(tempRoutesArray);
    setClubsArray(tempClubsArray);
    setLinksArray(tempLinksArray);
    console.log('inside renderClubs, routesArray ', routesArray);
    console.log('inside renderClubs, routesArray ', clubsArray);
    console.log('inside renderClubs, routesArray ', linksArray);
  };

  useEffect(() => {
    const cookieEmail = document.cookie.split('; ').find(row => row.startsWith('email='))
      .split('=')[1].replace('%40', '@');
    setEmail(cookieEmail);
  }, []);

  useEffect(() => {
    fetch('/clubs')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClubs(data);
        console.log('AFTER setClubs ', clubs);
        return data;
      }).then((data) => {
        console.log('before we invoke renderClubs ', clubs);
        renderClubs(data);
      })
      .catch(res => console.log('Error in getting clubs', res));
  }, []);

  // useEffect(() => {
  //   renderClubs();
  // });


  console.log(email);

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
      .catch(res => console.log('Error in sending clubs', res));
  };

  const handleClub = (e) => {
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