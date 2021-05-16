import './App.css';
import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [messages, setMessages] = useState([]);
  //const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get('/messages/sync').then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher('10d3b72df87d15f0af96', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>
              <Route path='/'>
                <Chat />
              </Route>
            </Switch>

            {/* <Chat messages={messages} /> */}
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
