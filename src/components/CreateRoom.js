import React from 'react';
import { ButtonItem } from '@atlaskit/side-navigation';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
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
            <ButtonItem className='createRoom_button' onClick={createRoom} iconBefore={<AddCircleIcon />}>Create Room</ButtonItem>
        </div>
    );
}

export default CreateRoom;
