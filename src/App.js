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
import { PublicTopbar, LoggedInTopbar, BusinessTopbar } from './components/Topbar';
import Account from './components/Account';
import Timeline from './components/Timeline';
import Board from './components/Board';
import Schedule from './components/Schedule';
import WorkDrive from './components/WorkDrive';

function App() {

  const [{ user }] = useStateValue();
  const [isPaidUser, setIsPaidUser] = useState();

  useEffect(() => {
    if (user) {
      checkPaidUser(user.uid)
    }
  })

  const checkPaidUser = (userUId) => {
    if (user) {
      db.collection('paidUsers').doc(userUId)
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
            <PublicTopbar />
            <Login />
          </>
        ) : (
          <>
            {isPaidUser ? (
              <>
                <Switch>
                  <Route path="/sign-in">
                    <BusinessTopbar />
                  </Route>
                  <Route path="/account">
                    <BusinessTopbar />
                    <Account />
                  </Route>
                  <Route path="/console">
                    <BusinessTopbar />
                    <Console />
                  </Route>
              </Switch>
            </>
            ) : (
            <>
              <Switch>
                <Route path="/sign-in">
                  <LoggedInTopbar />
                </Route>
                <Route path="/account">
                  <LoggedInTopbar />
                  <Account />
                </Route>
                <Route path="/console">
                  <LoggedInTopbar />
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
                <Route path="/workspace/:workspaceId/drive">
                  <Sidebar />
                  <WorkDrive />
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
