import React, { useState, useEffect } from 'react';
import { Button, Card } from '@blueprintjs/core';

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
                <Card className="console_card" elevation={1}>
                    <h5 className="bp3-heading">Talent</h5>
                    <p>Hiring, recruiting, and employer branding solutions for remote teams</p>
                    <Button className="console_button" text="Find talent" icon="mugshot" minimal outlined large />
                    <Card className="talents_listing">
                        <ul>
                            <li>Lorem Ipsum Dolor Sit Amet</li>
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                            <li>Lorem Ipsum Dolor Sit Amet</li> 
                        </ul>
                    </Card>
                </Card>
            </div>
            <div>
                <Card className="console_card" elevation={1}>
                    <h5 className="bp3-heading">Workspace</h5>
                    <p>Managing your talented remote teams via dedicated workspaces</p>
                    <Button className="console_button" text="Create workspace" icon="new-layers" minimal outlined large onClick={createWorkspace} />
                    <Card className="talents_listing">
                        {workspaces.map(workspace => (
                            <ListWorkspace text={workspace.name} id={workspace.id} />
                        ))}
                    </Card>
                </Card>
            </div>
        </div>
    );
}

export default Console;