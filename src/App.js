import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import Console from './components/Console';
import Topbar from './components/Topbar';
import Account from './components/Account';

function App() {

  // pul from data layer
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <div className="app">
      {!user ? (
        <>
        <Topbar />
          <Login />
        </>
      ) : (
        <>
        <Switch>
        <Route path="/account">
            <Topbar />
            <Account />
          </Route>
          <Route path="/console">
          <Topbar />
            <Console />
          </Route>
          <Route path="/workspace/:workspaceId/room/:roomId">
            <Sidebar />
            <Chat />
          </Route>
        </Switch>
        </>
        )
      }
      </div>
    </Router>
  );
}

export default App;
