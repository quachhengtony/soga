import React, { useState, useEffect } from 'react';
import {
    Divider,
    Card
} from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

import './Chat.css';
import db from '../firebase';
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {

    const { roomId, workspaceId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection('workspaces')
                .doc(workspaceId)
                .collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomDetails(snapshot.data())
                )
        }
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map((doc) => doc.data()))
            );
    }, [roomId])

    return (
        <div className="chat">
            <Card className="chat_card">
            <div className="chat_header">
                <h2 className="bp3-heading">{roomDetails?.name}</h2>
                <Divider />
            </div>
            <div className="chat_body">
                <div className="chat_message">
                    {roomMessages.map(({ message, timestamp, user, userImage }) => (
                        <Message
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    ))}
                </div>
           </div>
           <ChatInput roomName={roomDetails?.name} roomId={roomId} workspaceId={workspaceId} />
           </Card>
        </div>
    );
}

export default Chat;
