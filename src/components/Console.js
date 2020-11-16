import React, { useState, useEffect } from 'react';
import { Button, Card, H1, H2, H3, H4, H5, InputGroup, Icon } from '@blueprintjs/core';

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
            <div>
                    <H3 className="bp3-heading">Workspace</H3>
                    <p>Managing your talented remote teams via dedicated workspaces</p>
                    <div className='container'>
                        <Button className="console_button" text="Create workspace" intent='primary' large onClick={createWorkspace} />
                    </div>
                    <div className='workspace_list'>
                        {workspaces.map((workspace, index) => (
                            <ListWorkspace text={workspace.name} id={workspace.id} key={index} />
                        ))}
                    </div>
            </div>
        </div>
    );
}

export default Console;