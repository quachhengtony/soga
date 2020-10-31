import React, { useState } from 'react';
import './Console.css';
import { useHistory } from 'react-router-dom';
import db from '../firebase';
import { Button, Card } from '@blueprintjs/core';
import Navbarr from './Navbar';

function Console() {

    const [workspaces, setWorkspaces] = useState([]);
    const history = useHistory();

    const createWorkspace = () => {
        const workspaceName = prompt('Enter workspace name:');
        if (workspaceName) {
            db.collection('workspaces').add({
                name: workspaceName,
            })
        }
        db.collection('workspaces').onSnapshot(snapshot => {
            setWorkspaces(snapshot.docs.map(doc => ({
                id: doc.id,
            })))
        })
    }

    const initWorkspace = (workspaceId) => {
        const roomName = prompt('Enter 2 room names:');
        db.collection('workspaces').doc(workspaceId).collection('rooms').add({
            name: roomName,
        })
        history.push(`/workspace/${workspaceId}/room/undefined`)
    }

    return (
        <div className="console">
            <Navbarr />
            <div>
                <Card className="console_card" elevation={1}>
                    <h5 className="bp3-heading">Talent</h5>
                    <p>Hiring, recruiting, and employer branding solutions for remote teams</p>
                    <Button className="document" text="Find talent" icon="mugshot" minimal outlined />
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
                    <Button className="console_button" text="Create workspace" icon="new-layers" minimal outlined onClick={createWorkspace} />
                    {workspaces.map(workspace => (
                        <Button onClick={initWorkspace(workspace.id)} />
                    ))}
                    <Card className="talents_listing">
                        <ul>
                            <li>Product</li>
                            <li>Marketing</li>
                            <li>Project Awesome</li>
                            <li>My Company</li>
                        </ul>
                    </Card>
                    
                </Card>
            </div>
        </div>
    );
}

export default Console;
