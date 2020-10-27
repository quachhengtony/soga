import React from 'react';
import { Button } from '@blueprintjs/core';
import db from '../firebase';
import { useParams } from 'react-router-dom';

function CreateRoom() {

    const { workspaceId } = useParams();

    const createRoom = () => {
        const roomName = prompt('Enter room name:');
        if (roomName) {
            db.collection('workspaces').doc('GkT58bhptzQjZCQFzQAS').collection('rooms').add({
                    name: roomName,
                })
            }
    }

    return (
        <Button text="Rooms" icon="plus" minimal outlined onClick={createRoom} />
    );
}

export default CreateRoom;
