/* eslint-disable react/prop-types */
import React from 'react';
import PodcastClub from '../components/PodcastClub.jsx';
import PodcastContainer from '../containers/PodcastContainer.jsx';
import GroupChat from '../components/GroupChat.jsx';
import { useState, useEffect } from 'react';

const ClubPageContainer = (props) => {

  const [groupId, setGroupId ] = useState(props.groupId);
  const [podcasts, setPodcasts] = useState([]);
  const [messages, setMessages ] = useState([]);

  useEffect(() => {
    setGroupId(props.groupId);
  });

  useEffect(() => {
    console.log('PODCAST Container', props.groupId);
    fetch('/podcasts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
        })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        console.log('PODCASTS: ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupId]);


  useEffect(() => {
    console.log('PODCAST Container', props.groupId);
    fetch('/getcomments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
        })
      }
    ).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('GET MESSAGES ', data);
      setMessages(data);
    }).catch(err => console.log(err));
  }, [groupId]);

  const msgs = [];
  for (const message of messages){
    msgs.push(<li>User {message.user_id}: {message.comment}</li>);
  }
  console.log('club page container, ', props.groupId);
  return (
    <div>
      <h2>{props.name} Podcast Club</h2>
      <PodcastClub groupId={props.groupId} setPodcasts={setPodcasts} podcasts={podcasts}/>
      <h3>Group Chat (coming soon)</h3>
      <ul>
        {msgs}
      </ul>
      <br></br>
      <h3>Currently listening to...</h3>
      <PodcastContainer groupId={props.groupId} podcasts={podcasts}/>
    </div>
  );
};

export default ClubPageContainer;