import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Manage from "./components/Manage";
import { LoggedInTopbar } from "./components/Topbar";
import Account from "./components/Account";
import Timeline from "./components/Timeline";
import Board from "./components/Board";
import Schedule from "./components/Schedule";
import Storage from "./components/Storage";
import Settings from "./components/Settings";
import RoomVideoConference from "./components/RoomVideoConference";
import Inbox from "./components/Inbox";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <LoggedInTopbar />
          </Route>
          <Route path="/sign-in">
            <LoggedInTopbar />
            <Login />
          </Route>
          <PrivateRoute path="/u/inbox">
            <LoggedInTopbar />
            <Inbox />
          </PrivateRoute>
          <PrivateRoute path="/u/account">
            <LoggedInTopbar />
            <Account />
          </PrivateRoute>
          <PrivateRoute path="/b/inbox">
            <LoggedInTopbar />
            <Inbox />
          </PrivateRoute>
          <PrivateRoute path="/b/dashboard">
            <LoggedInTopbar />
            <Manage />
          </PrivateRoute>
          <PrivateRoute path="/b/account">
            <LoggedInTopbar />
            <Account />
          </PrivateRoute>
          {/* </Switch>
          <Switch> */}
          <PrivateRoute path="/workspace/:workspaceId/room/undefined/chat">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/chat">
            <Sidebar />
            <Chat />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/board">
            <Sidebar />
            <Board />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/schedule">
            <Sidebar />
            <Schedule />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/timeline">
            <Sidebar />
            <Timeline />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/storage">
            <Sidebar />
            <Storage />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/settings">
            <Sidebar />
            <Settings />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/video/:videoId">
            <RoomVideoConference />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// {!!user ? (
//   <>
//     <PublicTopbar />
//     <Switch>
//       <Route path="/sign-in">
//         <Login />
//       </Route>
//     </Switch>
//   </>
// ) : (
//   <>
//     {isPaidUser ? (
//       <>
//         <Switch>
//           <Route path="/account">
//             <BusinessTopbar />
//             <Account />
//           </Route>
//           <Route path="/manage">
//             <BusinessTopbar />
//             <Manage />
//           </Route>
//         </Switch>
//       </>
//     ) : (
//       <>
//         <Switch>
//           <Route path="/account">
//             <LoggedInTopbar />
//             <Account />
//           </Route>
//           <Route path="/inbox">
//             <LoggedInTopbar />
//             <Inbox />
//           </Route>
//         </Switch>
//       </>
//     )}
//     <Switch>
//       <Route path="/workspace/:workspaceId/room/undefined/chat">
//         <Sidebar />
//       </Route>
//       <Route path="/workspace/:workspaceId/room/:roomId/chat">
//         <Sidebar />
//         <Chat />
//       </Route>
//       <Route path="/workspace/:workspaceId/room/:roomId/board">
//         <Sidebar />
//         <Board />
//       </Route>
//       <Route path="/workspace/:workspaceId/room/:roomId/schedule">
//         <Sidebar />
//         <Schedule />
//       </Route>
//       <Route path="/workspace/:workspaceId/timeline">
//         <Sidebar />
//         <Timeline />
//       </Route>
//       <Route path="/workspace/:workspaceId/storage">
//         <Sidebar />
//         <Storage />
//       </Route>
//       <Route path="/workspace/:workspaceId/settings">
//         <Sidebar />
//         <Settings />
//       </Route>
//       <Route path="/workspace/:workspaceId/room/:roomId/video/:videoId">
//         <RoomVideoConference />
//       </Route>
//     </Switch>
//   </>
// )}
