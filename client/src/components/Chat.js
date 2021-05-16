import React, { useEffect, useState } from 'react';
import '../styles/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import db from '../firebase';

function Chat({ messages }) {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: 'varnika',
      timestamp: 'Just Now',
      received: true,
    });
    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last Seen..</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {/* {messages.map((message) => (
          <p className={`chat__message ${message.received && 'chat__reciever'}`}>
            <span className='chat__name'>{message.name}</span> {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>
          </p>
        ))} */}
      </div>

      <div className='chat__footer'>
        <InsertEmoticon />
        <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type='text' />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
