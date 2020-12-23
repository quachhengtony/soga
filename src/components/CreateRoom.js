import { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';

import db from '../firebase';
import { useStateValue } from '../StateProvider';

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
        <a href="javascript:void(0)" onClick={createRoom} className="dropdown-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon dropdown-item-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New room
        </a>
    );
}

export default CreateRoom;
