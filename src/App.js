import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useStateValue } from './StateProvider';
import db, {auth} from './firebase';

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import Manage from './components/Manage';
import { PublicTopbar, LoggedInTopbar, BusinessTopbar } from './components/Topbar';
import Account from './components/Account';
import Timeline from './components/Timeline';
import Board from './components/Board';
import Schedule from './components/Schedule';
import Storage from './components/Storage';
import JobPost from './components/JobPost';
import JobList from './components/JobList'
import Talents from './components/Talents';
import Settings from './components/Settings';
import RoomVideoConference from './components/RoomVideoConference';

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
    // <Router>
    //   <div className="app">
    //     { !user ? (
    //       <>
    //         <PublicTopbar />
    //         <Login />
    //       </>
    //     ) : (
    //       { isPaidUser ? (
    //         <>
    //           <Switch>
    //           <Route path="/sign-in">
    //               <BusinessTopbar />
    //               <Login />
    //             </Route>
    //             <Route path="/account">
    //               <BusinessTopbar />
    //               <Account />
    //             </Route>
    //             <Route path="/manage">
    //               <BusinessTopbar />
    //               <Manage />
    //             </Route>
    //             <Route path="/post-a-remote-job">
    //               <BusinessTopbar />
    //               <JobPost />
    //             </Route>
    //             <Route path="/find-a-remote-job">
    //               <BusinessTopbar />
    //               <JobList />
    //             </Route>
    //             <Route path="/talents">
    //               <BusinessTopbar />
    //               <Talents />
    //             </Route>
    //             </Switch>
    //         </>
    //       ) : (
    //         <>
    //         <Switch>
    //           <Route path="/account">
    //             <LoggedInTopbar />
    //           <Account />
    //           </Route>
    //           <Route path="/manage">
    //             <LoggedInTopbar />
    //             <Manage />
    //           </Route>
    //           <Route path="/find-a-remote-job">
    //             <LoggedInTopbar />
    //             <JobList />
    //           </Route>
    //         </Switch>
    //         </>
    //       )}

    //       <>
    //         <Switch>
    //           <Route path="/workspace/:workspaceId/room/:roomId/chat">
    //             <Sidebar />
    //             <Chat />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/room/:roomId/board">
    //             <Sidebar />
    //             <Board />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/room/:roomId/schedule">
    //             <Sidebar />
    //             <Schedule />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/timeline">
    //             <Sidebar />
    //             <Timeline />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/storage">
    //             <Sidebar />
    //             <Storage />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/settings">
    //             <Sidebar />
    //             <Settings />
    //           </Route>
    //           <Route path="/workspace/:workspaceId/room/:roomId/video/:videoId">
    //             <RoomVideoConference />
    //           </Route>
    //         </Switch>
    //       </>
    //     )}
    //   </div>
    // </Router>
    <Router>
      <div className="app">
        {!user ? (
          <>
            <PublicTopbar />
            <Switch>
              <Route path="/sign-in">
                <Login />
              </Route>
              <Route path="/find-a-remote-job">
                <JobList />
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
                  <Route path="/post-a-remote-job">
                    <BusinessTopbar />
                    <JobPost />
                  </Route>
                  <Route path="/find-a-remote-job">
                    <BusinessTopbar />
                    <JobList />
                  </Route>
                  <Route path="/talents">
                    <BusinessTopbar />
                    <Talents />
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
                <Route path="/manage">
                  <LoggedInTopbar />
                  <Manage />
                </Route>
                <Route path="/find-a-remote-job">
                  <LoggedInTopbar />
                  <JobList />
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
        )
        }
      </div>
    </Router>
  );
}

export default App;
