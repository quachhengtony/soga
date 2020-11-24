import { useState, useEffect } from 'react';
import Button from '@atlaskit/button';

import './Console.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import ListWorkspace from './ListWorkspace';

function Console() {

    const [workspaces, setWorkspaces] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        listWorkspaces();
    })

    const createWorkspace = () => {
        const workspaceName = prompt('Enter workspace name:');
        if (workspaceName) {
            db.collection('workspaces').add({
                name: workspaceName,
                user: user.email,
            })
        }
    }

    const listWorkspaces = () => {
        db.collection('workspaces').where("user", "==", user.email).onSnapshot(snapshot => (
                setWorkspaces(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                })))
        ))
    }

    return (
        <div className="console">
            <div className="console_header">
                <h2>Workspace</h2>
                <p>Managing your talented remote teams via dedicated workspaces</p>
                <Button appearance='primary' className="createWorkspace_button" onClick={createWorkspace}>Create Workspace</Button>
            </div>
            <div className='console_body'>
                {workspaces.map((workspace, index) => (
                    <ListWorkspace text={workspace.name} id={workspace.id} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Console;