// import { useState, useEffect } from 'react'
// import firebase from 'firebase';
// import Textfield from '@atlaskit/textfield';
// import Button, { ButtonGroup } from '@atlaskit/button';

// import './Settings.css';
// import db from '../firebase';
// import { useParams } from "react-router-dom";
// import { useStateValue } from '../StateProvider';

// function Settings() {

//     const { workspaceId } = useParams();
//     const { user } = useStateValue();

//     const [userEmail, setUserEmail] = useState("");
//     const [rooms, setRooms] = useState([]);

//     const addToWorkspaceUsers = () => {
//         if (user) {
//             db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").add({
//                 userEmail: user.email
//             })
//         }
//         if (userEmail != "") {
//             db.collection("freeUsers").doc(userEmail).collection("inbox").add({
//                 workspaceName: "My Workspace",
//                 workspaceId: workspaceId
//             })
//             db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").add({
//                 userEmail: userEmail
//             })
//         }
//     }

//     const deleteRoom = (roomId) => {
//         db.collection("workspaces").doc(workspaceId).collection("rooms").doc(roomId)
//             .delete()
//             .then(function() {
//                 console.log("Room successfully deleted!");
//             })
//             .catch(function(error) {
//                 console.error("Error removing room: ", error);
//             });
//     }

//     useEffect(() => {
//         db.collection("workspaces").doc(workspaceId).collection("rooms")
//             .onSnapshot(snapshot => setRooms(snapshot.docs.map(doc => ({
//                 roomName: doc.data().roomName,
//                 roomId: doc.id,
//                 authorName: doc.data().authorName,
//                 date: doc.data().date
//             }))))
//     }, [])

//     return (
//         <div className="settings">
//             <div className="settings__header">
//                 <h2>Settings</h2>
//             </div>
//             <div className="settings__body">
//                 <div className="flexContainer">
//                     <div className="textfield__container">
//                         <label htmlFor="textfield">Workspace name</label>
//                         <Textfield className="settings__textfield" name="textfield"></Textfield>
//                     </div>
//                     <div className="button__container">
//                         <Button shouldFitContainer={true}>Rename</Button>
//                     </div>
//                 </div>
//                 <div className="roomsList__container">
//                     <p>Room list</p>
//                     <table className="roomsList">
//                         <tr>
//                             <th>Room name</th>
//                             <th>Created by</th>
//                             <th>Date</th>
//                             <th>Action</th>
//                         </tr>
//                         {rooms.map((room) => (
//                             <tr>
//                                 <td>{room.roomName}</td>
//                                 <td>{room.authorName}</td>
//                                 <td>{room.date}</td>
//                                 <td><Button spacing="compact" appearance="danger" onClick={deleteRoom.bind(this, room.roomId)}>Delete</Button></td>
//                             </tr>
//                         ))}
//                     </table>
//                 </div>
//                 <div className="flexContainer">
//                     <div className="textfield__container">
//                         <label htmlFor="textfield">User's email address</label>
//                         <Textfield className="settings__textfield" name="textfield" value={userEmail} onChange={e => setUserEmail(e.target.value)}></Textfield>
//                     </div>
//                     <div className="button__container">
//                         <Button onClick={addToWorkspaceUsers} shouldFitContainer={true}>Invite this user</Button>
//                     </div>
//                 </div>
//                 <div className="container --border-red">
//                     <div>
//                         <b>Delete this workspace</b>
//                         <p>Once you delete a repository, there is no going back. Please be certain.</p>
//                     </div>
//                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Button appearance="danger">Delete this workspace</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Settings;

import { useState, useEffect, useRef } from "react";
import "./Settings.css";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Settings() {
  const { workspaceId } = useParams();

  const [rooms, setRooms] = useState([]);
  const userEmail = useRef("");
  const [workspaceAuthor, setWorkspaceAuthor] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);

  const addToWorkspaceUsers = () => {
    if (userEmail !== "") {
      db.collection("freeAccounts").doc(userEmail.current.value).collection("links").add({
          userEmail: userEmail.current.value
      });
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("settings")
        .doc("user")
        .collection("workspaceUsers")
        .add({
          userEmail: userEmail.current.value,
          userStatus: "user"
        });
        userEmail.current.value = "";
    } else {
        alert("User email cannot be empty!")
    }
  };

  const deleteRoom = (roomId) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .delete()
      .then(function () {
        console.log("Room successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing room: ", error);
      });
  };

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            roomName: doc.data().roomName,
            roomId: doc.id,
            authorName: doc.data().authorName,
            date: doc.data().date,
          }))
        )
      );
      db.collection("workspaces").doc(workspaceId).get().then(doc => setWorkspaceAuthor(doc.data()));
      db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("user")
      .collection("workspaceUsers")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(
          snapshot.docs.map((doc) => ({
            userEmail: doc.data().userEmail,
            userStatus: doc.data().userStatus
          }))
        )
      );
  }, []);

  return (
    <div className="settings">
      <ol class="breadcrumb" aria-label="breadcrumbs">
        <li class="breadcrumb-item">
          <a>Workspace</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a>Settings</a>
        </li>
      </ol>
      <div className="card --settings-workspace-rename-card">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="New workspace name..."
          />
          <a className="btn btn-primary">
            Rename
          </a>
        </div>
      </div>
      <div className="card --settings-room-list-card">
        <div className="table-responsive">
          <table className="table table-vcenter card-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created by</th>
                <th>Date</th>
                <th className="w-1" />
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr>
                  <td>{room.roomName || <div class="skeleton-line skeleton-line-full">djbdskjavb</div>}</td>
                  <td className="text-muted">
                    {room.authorName || <div class="skeleton-line skeleton-line-full"></div>}
                  </td>
                  <td className="text-muted">
                    {room.date || <>...</>}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      onClick={() => deleteRoom(room.roomId)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card --settings-link-people-card">
        <div className="card-body">
          <input
            type="text"
            ref={userEmail}
            className="form-control"
            placeholder="johndoe@gmail.com"
          />
          <a href="javascript:void(0)" class="btn btn-primary" onClick={addToWorkspaceUsers}>
            Link
          </a>
        </div>
      </div>
      <div className="card --settings-people-list-card">
        <div className="table-responsive">
          <table className="table table-vcenter card-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
                <th className="w-1" />
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{workspaceAuthor ? workspaceAuthor.authorEmail : "..."}</td>
                  <td className="text-muted">
                    admin
                  </td>
                  <td className="text-muted">
                    {workspaceAuthor ? workspaceAuthor.date : "..."}
                  </td>
                  <td>
                      Admin
                  </td>
                </tr>
              {workspaceUsers.map(workspaceUser => (
                <tr>
                  <td>{workspaceUser.userEmail ? workspaceUser.userEmail : "..."}</td>
                  <td className="text-muted">
                    {workspaceUser.userStatus ? workspaceUser.userStatus : "..."}
                  </td>
                  <td className="text-muted">
                    ##/##/####
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                    >
                      Admin
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
