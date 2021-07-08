import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import NewClub from './NewClub.jsx';

const HomePage = (props) => {

  const [newClub, addNewClub] = useState('');
  const [clubs, setClubs] = useState([]);

  // useEffect(() => {
  //   fetch('/club')
  //     .then((res) => res.json())
  //     .then(data => {
  //       let groups = [];
  //       data.forEach(element => groups.push(element.name))
  //     })
  //     .catch((err) => {
  //       console.log('Error in getting clubs', err);
  //     })
  // }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch(form.action, {
      method: form.action,
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
    addNewClub(e.target.value);
  };

  return (

    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="GroupForm" method="POST" action="/club/add" onSubmit={handleSubmit}>
          <TextField label='group' name='group' variant="outlined" onChange={handleClub}></TextField>
          <Button type="submit" variant="outlined">Add Club</Button>
        </form>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <h1>You added a new podcast club!</h1>
      </Box>

    </div>
  );
};

export default HomePage;