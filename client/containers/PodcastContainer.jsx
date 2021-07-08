/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Podcasts from '../components/Podcasts.jsx';

const PodcastContainer = (props) => {

  console.log('PODCAST CONTAINER, ', props.podcasts);
  const podcasts = [];
  for (const podcast of props.podcasts){
    podcasts.push(<Podcasts podcast_name={podcast.podcast_name} author={podcast.author}/>);
  }
  return (
    <div>
      {podcasts}
    </div>
  );
};

export default PodcastContainer;