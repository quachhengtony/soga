import { useState, useEffect } from 'react'
import firebase from 'firebase';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';

import './Settings.css';
import db from '../firebase';
import { useParams } from "react-router-dom";
import { useStateValue } from '../StateProvider';

function Settings() {

    const { workspaceId } = useParams();
    const [{ user }] = useStateValue();

    const [userEmail, setUserEmail] = useState("");
    const [rooms, setRooms] = useState([]);

    const addToWorkspaceUsers = () => {
        if (user) {
            db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").add({
                userEmail: user.email
            })
        }
        if (userEmail != "") {
            db.collection("freeUsers").doc(userEmail).collection("inbox").add({
                workspaceName: "My Workspace",
                workspaceId: workspaceId
            })
            db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").add({
                userEmail: userEmail
            })
        }
    }

    const deleteRoom = (roomId) => {
        db.collection("workspaces").doc(workspaceId).collection("rooms").doc(roomId)
            .delete()
            .then(function() {
                console.log("Room successfully deleted!");
            })
            .catch(function(error) {
                console.error("Error removing room: ", error);
            });
    }

    useEffect(() => {
        db.collection("workspaces").doc(workspaceId).collection("rooms")
            .onSnapshot(snapshot => setRooms(snapshot.docs.map(doc => ({
                roomName: doc.data().roomName,
                roomId: doc.id,
                authorName: doc.data().authorName,
                date: doc.data().date
            }))))
    }, [])

    return (
        <div className="settings">
            <div className="settings__header">
                <h2>Settings</h2>
            </div>
            <div className="settings__body">
                <div className="flexContainer">
                    <div className="textfield__container">
                        <label htmlFor="textfield">Workspace name</label>
                        <Textfield className="settings__textfield" name="textfield"></Textfield>
                    </div>
                    <div className="button__container">
                        <Button shouldFitContainer={true}>Rename</Button>
                    </div>
                </div>
                <div className="roomsList__container">
                    <p>Room list</p>
                    <table className="roomsList">
                        <tr>
                            <th>Room name</th>
                            <th>Created by</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {rooms.map((room) => (
                            <tr>
                                <td>{room.roomName}</td>
                                <td>{room.authorName}</td>
                                <td>{room.date}</td>
                                <td><Button spacing="compact" appearance="danger" onClick={deleteRoom.bind(this, room.roomId)}>Delete</Button></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="flexContainer">
                    <div className="textfield__container">
                        <label htmlFor="textfield">User's email address</label>
                        <Textfield className="settings__textfield" name="textfield" value={userEmail} onChange={e => setUserEmail(e.target.value)}></Textfield>
                    </div>
                    <div className="button__container">
                        <Button onClick={addToWorkspaceUsers} shouldFitContainer={true}>Invite this user</Button>
                    </div>
                </div>
                <div className="container --border-red">
                    <div>
                        <b>Delete this workspace</b>
                        <p>Once you delete a repository, there is no going back. Please be certain.</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button appearance="danger">Delete this workspace</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;
