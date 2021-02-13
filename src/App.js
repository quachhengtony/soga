import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Manage from "./components/Manage";
import { Topbar, PrivateTopbar } from "./components/Topbar";
import Account from "./components/Account";
import Timeline from "./components/Timeline";
import Board from "./components/Board";
import Schedule from "./components/Schedule";
import Storage from "./components/Storage";
import Settings from "./components/Settings";
import RoomVideoConference from "./components/RoomVideoConference";
import Inbox from "./components/Inbox";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import Footer from "./components/Footer";
import WorkspaceOverview from "./components/WorkspaceOverview";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Topbar />
            <HomePage />
          </Route>
          <Route path="/signin">
            <Topbar />
            <Login />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>

          <PrivateRoute path="/profile-account">
            <PrivateTopbar />
            <Account />
          </PrivateRoute>
          <PrivateRoute path="/notifications">
            <PrivateTopbar />
          </PrivateRoute>
          <PrivateRoute path="/links">
            <PrivateTopbar />
            <Inbox />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/activities">
            <PrivateTopbar />
            <ActivitiesPage />
          </PrivateRoute>
          <PrivateRoute path="/b/dashboard">
            <PrivateTopbar />
            <Manage />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/overview">
            <Sidebar />
            <WorkspaceOverview />
          </PrivateRoute>
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

          <PrivateRoute path="/workspace/:workspaceId/reports">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/search">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/links">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/account">
            <Sidebar />
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
