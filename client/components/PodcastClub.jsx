import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const PodcastClub = (props) => {

  const [podcast, addPodcast] = useState('');
  const [friends, addFriend] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch(form.action, {
      method: form.action,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        podcast
      })
    })
      .then((res) => res.json())
      .catch(res => console.log('Error in sending group'.res));
  }

  const handlePodcast = (e) => {
    addPodcast(e.target.value);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="PodcastForm" method="POST" action="/club/addPodcast" onSubmit={handleSubmit}>
          <TextField label='group' name='group' variant="outlined" onChange={handlePodcast}></TextField>
          <Button type='submit' variant="outlined">Add Podcast</Button>
        </form>
      </Box>
    </div>
  )
}

export default PodcastClub;
