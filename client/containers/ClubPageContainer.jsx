/* eslint-disable react/prop-types */
import React from 'react';
import PodcastClub from '../components/PodcastClub.jsx';
import PodcastContainer from '../components/Podcasts.jsx';
import GroupChat from '../components/GroupChat.jsx';

const ClubPageContainer = (props) => {

  return (
    <div>
      <h1>{props.name} Podcast Club</h1>
      <PodcastClub />
      <GroupChat />
      {/* <PodcastContainer /> */}
    </div>
  );
};

export default ClubPageContainer;