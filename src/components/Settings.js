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
    const [userEmail, setUserEmail] = useState();
    const [{ user }] = useStateValue();

    const addToUsers = () => {
        if (userEmail != "") {
            db.collection("freeUsers").doc(userEmail).collection("workspaces").add({
                workspaceName: "My Workspace",
                workspaceId: workspaceId
            })
        }
    }

    return (
        <div className="settings">
            <div className="settings__header">
                <h2>Settings</h2>
            </div>
            <div className="settings__body">
                <div className="settings__container">
                    <div className="textfield__container">
                        <label htmlFor="textfield">Workspace name</label>
                        <Textfield className="settings__textfield" name="textfield"></Textfield>
                    </div>
                    <div className="button__container">
                        <Button shouldFitContainer={true}>Rename</Button>
                    </div>
                </div>
                <div className="settings__container">
                    <div className="textfield__container">
                        <label htmlFor="textfield">User's email address</label>
                        <Textfield className="settings__textfield" name="textfield" value={userEmail} onChange={e => setUserEmail(e.target.value)}></Textfield>
                    </div>
                    <div className="button__container">
                        <Button onClick={addToUsers} shouldFitContainer={true}>Invite this user</Button>
                    </div>
                </div>
                <div className="settings__container --danger">
                    <p>Once you delete a workspace, there is no going back. Please be certain.</p>
                    <Button appearance="danger" onClick={addToUsers}>Delete this workspace</Button>
                </div>
            </div>
        </div>
    )
}

export default Settings;
