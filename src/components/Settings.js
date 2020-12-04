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
    const [input, setInput] = useState();
    const [{ user }] = useStateValue();

    const addToUsers = () => {
        if (input != "") {
            db.collection("workspaces").doc(workspaceId).collection("settings").doc("users").collection("authorizedUsers").add({
                userEmail: input
            })
        }
    }

    return (
        <div className="settings">
            <div className="settingsContainer">
                <Textfield value={input} onChange={e => setInput(e.target.value)}></Textfield>
                <Button onClick={addToUsers}>Authorize user</Button>
            </div>
        </div>
    )
}

export default Settings;
