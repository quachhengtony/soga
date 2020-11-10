import React from 'react';
import { Button } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

import db from '../firebase';
import './CreateRoom.css';

function CreateRoom() {
    const { workspaceId } = useParams();
    const createRoom = () => {
        const roomName = prompt('Enter room name:');
        if (roomName) {
            db.collection('workspaces').doc(workspaceId).collection('rooms').add({
                    name: roomName,
                })
            }
    }

    return (
        <div className="createRoom">
            <Button text="Rooms" icon="new-layer" minimal outlined onClick={createRoom} />
            <Button icon="caret-down" minimal />
        </div>
    );
}

export default CreateRoom;
