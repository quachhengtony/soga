import { useState, useEffect, useCallback } from "react";

import "../styles/Sidebar.css";
import db from "../adapters/firebase";
import { useHistory, useParams } from "react-router-dom";
import SelectRoom from "./SelectRoom";
import CreateRoom from "./CreateRoom";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function Sidebar() {
  const { workspaceId } = useParams();
  const { user } = useStateValue();
  const history = useHistory();

  const [workspaceName, setWorkspaceName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const { currentUserName, currentUserEmail, currentUserUUId } = useCurrentUserDetails();

  const push = (destination) => {
    history.push(destination);
  };

  const memoizedSetRooms = useCallback(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            roomId: doc.id,
            roomName: doc.data().roomName,
          }))
        )
      );
  }, [rooms]);

  const memoizedSetWorkspaceUsers = useCallback(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("user")
      .collection("workspaceUsers")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(snapshot.docs.map((doc) => doc.data()))
      );
  }, [workspaceUsers]);

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then(function (doc) {
        setWorkspaceName(doc.data().workspaceName);
      });
    memoizedSetRooms();
    // db.collection('workspaces').doc(workspaceId).collection('rooms').orderBy("timestamp", "asc").onSnapshot(snapshot => (
    //   setRooms(snapshot.docs.map(doc => ({
    //     roomId: doc.id,
    //     roomName: doc.data().roomName
    //   })))
    // ))
    memoizedSetWorkspaceUsers();
    // db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").onSnapshot(snapshot => (
    //   setWorkspaceUsers(snapshot.docs.map(doc => doc.data()))
    // ))
  }, []);

  return (
    <aside className="navbar navbar-vertical navbar-expand-lg sidebar">
      <div className="left">
        <a
          href="javascript:void(0)"
          onClick={() => history.push("/links")}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-skype"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396z" />
            <path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -.997 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/reports`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-file-report"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="17" cy="17" r="4" />
            <path d="M17 13v4h4" />
            <path d="M12 3v4a1 1 0 0 0 1 1h4" />
            <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/search`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/storage`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-files"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 3v4a1 1 0 0 0 1 1h4" />
            <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
            <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/settings`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-settings"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/links`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-link"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
          </svg>
        </a>
        <a
          href="javascript:void(0)"
          onClick={() => history.push(`/workspace/${workspaceId}/account`)}
          class="btn btn-bitbucket btn-icon wpbtn"
          aria-label="Button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-user"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </a>
      </div>

      <div className="dropdown-menu dropdown-menu-demo right">
        <h6 className="dropdown-header">Overview</h6>
        <a href="javascript:void(0)" className="dropdown-item" onClick={() => history.push(`/workspace/${workspaceId}/overview`)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon dropdown-item-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <line x1="9" y1="8" x2="10" y2="8" />
            <line x1="9" y1="12" x2="10" y2="12" />
            <line x1="9" y1="16" x2="10" y2="16" />
            <line x1="14" y1="8" x2="15" y2="8" />
            <line x1="14" y1="12" x2="15" y2="12" />
            <line x1="14" y1="16" x2="15" y2="16" />
            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
          </svg>
          {workspaceName ? workspaceName : "..."}
        </a>
        <a href="javascript:void(0)" className="dropdown-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon dropdown-item-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
            <line x1="11" y1="6" x2="20" y2="6" />
            <line x1="11" y1="12" x2="20" y2="12" />
            <line x1="11" y1="18" x2="20" y2="18" />
          </svg>
          Tasks
        </a>
        <a href="javascript:void(0)" className="dropdown-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon dropdown-item-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M4 13h3l3 3h4l3 -3h3" />
          </svg>
          Inbox
        </a>
        <div className="dropdown-divider" />
        <h6 className="dropdown-header">Rooms</h6>
        {rooms.map((room, index) => (
          <SelectRoom text={room.roomName} id={room.roomId} key={index} />
        ))}
        <h6 className="dropdown-header">People</h6>
        {/* <a href="#" className="dropdown-item">
          <span
            className="avatar avatar-xs rounded me-2"
            style={{ backgroundImage: "url(./static/avatars/000m.jpg)" }}
          />
          Paweł Kuna 
          <span class="badge bg-red-lt ms-auto">red</span>
        </a> */}
        <a href="javascript:void(0)" className="dropdown-item">
          <span className="avatar avatar-xs rounded me-2">T</span>
          {currentUserName}
          <span class="badge bg-red-lt ms-auto">you</span>
        </a>
        {/* <a href="javascript:void(0)" className="dropdown-item">
          <span className="avatar avatar-xs rounded me-2">QH</span>
          Quách Hêng Tôny
          <span class="badge bg-green ms-auto"></span>
        </a> */}
        {/* <a href="javascript:void(0)" className="dropdown-item">
          <span className="avatar avatar-xs rounded me-2">TQ</span>
          Tôny Quách
          <span class="badge bg-green ms-auto"></span>
        </a> */}
        <div className="dropdown-divider" />
        <h6 className="dropdown-header">Actions</h6>
        <CreateRoom />
        <a href="javascript:void(0)" className="dropdown-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon dropdown-item-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
          Logout
        </a>
      </div>
      {/* </div> */}
    </aside>
  );
}
export default Sidebar;
