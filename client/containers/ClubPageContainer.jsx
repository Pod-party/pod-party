import React from 'react';
import PodcastClub from '../components/PodcastClub.jsx';
import PodcastContainer from '../components/Podcasts.jsx';
import GroupChat from '../components/GroupChat.jsx';

const ClubPageContainer = (prop) => {

  return (
    <div>
      <h1>Team Geodude Podcast Club</h1>
      <PodcastClub />
      <GroupChat />
      <PodcastContainer />
    </div>
  );
};

export default ClubPageContainer;