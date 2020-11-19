import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useStateValue } from './StateProvider';
import db from './firebase';

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import Console from './components/Console';
import { Topbar, TopbarForPaidUser } from './components/Topbar';
import Account from './components/Account';
import Timeline from './components/Timeline';
import Board from './components/Board';
import Schedule from './components/Schedule';

function App() {

  const [{ user }] = useStateValue();
  const [isPaidUser, setIsPaidUser] = useState();

  useEffect(() => {
    checkPaidUser();
  })

  const checkPaidUser = () => {
    if (user) {
      db.collection('paidUsers').doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
              setIsPaidUser(true);
          } else {
            setIsPaidUser(false);
          }})
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
    }
  }

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
            {isPaidUser ? (
              <>
                <Switch>
                  <Route path="/account">
                    <TopbarForPaidUser />
                    <Account />
                  </Route>
                  <Route path="/console">
                    <TopbarForPaidUser />
                    <Console />
                  </Route>
                </Switch>
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
                </Switch>
              </>
            )}
              <Switch>
                <Route path="/workspace/:workspaceId/room/:roomId/chat">
                  <Sidebar />
                  <Chat />
                </Route>
                <Route path="/workspace/:workspaceId/room/:roomId/board">
                  <Sidebar />
                  <Board />
                </Route>
                <Route path="/workspace/:workspaceId/room/:roomId/schedule">
                  <Sidebar />
                  <Schedule />
                </Route>
                <Route path="/workspace/:workspaceId/timeline">
                  <Sidebar />
                  <Timeline />
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
