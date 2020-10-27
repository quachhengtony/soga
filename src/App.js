import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useStateValue } from './StateProvider';

function App() {

  // pul from data layer
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <div className="app">
      {!user ? (<Login />) : (
        <Switch>
          <Route path="/workspace/:workspaceId/room/:roomId">
            <Sidebar />
            <Chat />
          </Route>
        </Switch>
        )
      }
      </div>
    </Router>
  );
}

export default App;
