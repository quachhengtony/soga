import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/workspace/:workspaceId/room/:roomId">
            <Sidebar />
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
