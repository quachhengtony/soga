import { useState, useEffect }from 'react';
import { ButtonItem } from '@atlaskit/side-navigation';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';

import db from '../firebase';
import { useStateValue } from '../StateProvider';
import './CreateRoom.css';

function CreateRoom() {

    const { workspaceId } = useParams();
    const { user } = useStateValue();
    const [currentDate, setCurrentDate] = useState();

    const getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        setCurrentDate(today);
    }

    useEffect(() => {
        getCurrentDate();
    }, [])

    const createRoom = () => {
        const roomName = prompt('Enter room name:');
        if (roomName) {
            db.collection('workspaces').doc(workspaceId).collection('rooms').add({
                    roomName: roomName,
                    authorName: user?.displayName,
                    authorEmail: user?.email,
                    authorId: user?.uid,
                    date: currentDate,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
