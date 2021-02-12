import { useState, useEffect, useRef } from "react";
import "../styles/Settings.css";
import db from "../adapters/firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import firebase from "firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function Settings() {
  const { workspaceId } = useParams();

  const [rooms, setRooms] = useState([]);
  const userEmail = useRef("");
  const [workspaceAuthor, setWorkspaceAuthor] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const [workspaceDetails, setWorkspaceDetails] = useState([]);
  const { currentUserName } = useCurrentUserDetails();

  const { user, currentDate } = useStateValue();




  const handleAddUsers = async () => {
    if (userEmail.current.value !== "") {
      await db.collection("workspaces")
        .doc(workspaceId)
        .collection("settings")
        .doc("link")
        .collection("users")
        .add({
          userEmail: userEmail.current.value,
          isAdmin: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          date: currentDate
        })
        .then(() => {
          db.collection("users").doc(userEmail.current.value).collection("workspaces").doc(workspaceId).set({
            workspaceId: workspaceId,
            workspaceName: workspaceDetails.workspaceName,
            authorEmail: workspaceDetails.authorEmail,
            authorName: workspaceDetails.authorName,
            authorRole: workspaceDetails.authorRole,
            authorBusinessName: workspaceDetails.authorBusinessName,
            createdAt: workspaceDetails.date,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        })
        .catch(error => console.log(error))
      userEmail.current.value = "";
      alert("Added successfully!");
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
      .get()
      .then((doc) => setWorkspaceDetails(doc.data()))
      .catch((error) => console.log(error));

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
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then((doc) => setWorkspaceAuthor(doc.data()));
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("link")
      .collection("users")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(
          snapshot.docs.map((doc) => ({
            userEmail: doc.data().userEmail,
            userStatus: doc.data().userStatus,
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
          <a className="btn btn-primary">Rename</a>
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
                  <td>
                    {room.roomName}
                  </td>
                  <td className="text-muted">
                    {room.authorName}
                  </td>
                  <td className="text-muted">{room.date || <>...</>}</td>
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
          <a
            href="javascript:void(0)"
            class="btn btn-primary"
            onClick={handleAddUsers}
          >
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
              {workspaceUsers.map((workspaceUser) => (
                <tr>
                  <td>{workspaceUser.userEmail || "..."}</td>
                  <td className="text-muted">
                    {workspaceUser.isAdmin ? "User" : "Admin"}
                  </td>
                  <td className="text-muted">##/##/####</td>
                  <td>
                    <a href="javascript:void(0)">Admin</a>
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
