import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useStateValue } from "./StateProvider";
import db from "./firebase";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Manage from "./components/Manage";
import {
  PublicTopbar,
  LoggedInTopbar,
  BusinessTopbar,
} from "./components/Topbar";
import Account from "./components/Account";
import Timeline from "./components/Timeline";
import Board from "./components/Board";
import Schedule from "./components/Schedule";
import Storage from "./components/Storage";
import Settings from "./components/Settings";
import RoomVideoConference from "./components/RoomVideoConference";
import Inbox from "./components/Inbox";

function App() {
  const [{ user }] = useStateValue();
  const [isPaidUser, setIsPaidUser] = useState(false);

  const checkBusinessAccount = (uid) => {
    db.collection("accounts").where("business.userId", "==", uid)
      .get()
      .then(() => setIsPaidUser(true))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (user) {
      checkBusinessAccount(user.uid)
    }
  });

  return (
    <Router>
      <div className="app">
        {!user ? (
          <>
            <PublicTopbar />
            <Switch>
              <Route path="/sign-in">
                <Login />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            {isPaidUser ? (
              <>
                <Switch>
                  <Route path="/account">
                    <BusinessTopbar />
                    <Account />
                  </Route>
                  <Route path="/manage">
                    <BusinessTopbar />
                    <Manage />
                  </Route>
                </Switch>
              </>
            ) : (
              <>
                <Switch>
                  <Route path="/account">
                    <LoggedInTopbar />
                    <Account />
                  </Route>
                  <Route path="/inbox">
                    <LoggedInTopbar />
                    <Inbox />
                  </Route>
                </Switch>
              </>
            )}
            <Switch>
              <Route path="/workspace/:workspaceId/room/undefined/chat">
                <Sidebar />
              </Route>
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
              <Route path="/workspace/:workspaceId/storage">
                <Sidebar />
                <Storage />
              </Route>
              <Route path="/workspace/:workspaceId/settings">
                <Sidebar />
                <Settings />
              </Route>
              <Route path="/workspace/:workspaceId/room/:roomId/video/:videoId">
                <RoomVideoConference />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
