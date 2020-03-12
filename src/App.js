import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const username = prompt('What is your name?');

const socketURL = 'http://localhost:9000/default';

const socket = io(socketURL, {
  query: {
    username
  }
});

function App() {
  const [namespaces, setNamespaces] = useState(null);
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user_connected', {
        socketID: socket.id,
        username: socket.query.username
      });
      console.log(socket);
      socket.on('fetch_namespaces', data => {
        setNamespaces(data);
        console.log(data);
      });
      socket.on('load_rooms', data => {
        console.log(data);
      });
    });
  }, []);

  console.log(namespaces);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
