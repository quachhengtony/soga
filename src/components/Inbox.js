import { useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import { useHistory } from 'react-router-dom';

import './Inbox.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Inbox() {

    const [addedWorkspaces, setAddedWorkspaces] = useState([]);
    const [{ user }] = useStateValue();
    const history = useHistory();

    const getAddedWorkspaces = () => {
        db.collection("freeUsers").doc(user.email).collection("workspaces").onSnapshot(snapshot => (
                setAddedWorkspaces(snapshot.docs.map(doc => doc.data()))
        ))
    }

    useEffect(() => {
        if (user) {
            getAddedWorkspaces();
        }
    })

    return (
        <div className="inbox">
            <div className="inbox__header">
                <h2>Lorem ipsum</h2>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className='inbox__body'>
                {addedWorkspaces.map(({ workspaceName, workspaceId }) => (
                    <div>
                        <span>{workspaceName ? workspaceName : "No name"}</span>
                        <Button onClick={() => history.push(`/workspace/${workspaceId}/room/undefined/chat`)}>Go</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inbox;