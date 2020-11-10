import React, { useState, useEffect } from 'react';
import {
    Divider,
    Card,
    Button
} from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

import './Chat.css';
import db from '../firebase';
import Message from './Message';
import ChatInput from './ChatInput';
import Board from './Board';

function Chat() {

    const { roomId, workspaceId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    const [chatVisible, setChatVisible] = useState('');
    const [boardVisible, setBoardVisible] = useState('none');

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
    
    const handleChatVisibility = () => {
        setChatVisible('none');
        setBoardVisible('');
    }

    const handleBoardVisibility = () => {
        setBoardVisible('none');
        setChatVisible('');
    }

    return (
        <div className="chat">
            <Card className="chat_card">
            <div style={{display: chatVisible}}>
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
                <ChatInput className="chat_input" roomName={roomDetails?.name} roomId={roomId} workspaceId={workspaceId} />
            </div>
            <div style={{display: boardVisible}}>
                <Board />
            </div>
            <Card className="chat_buttons">
                <div>
                    <Button icon="chat" onClick={handleBoardVisibility} minimal large fill />
                </div>
                <div>
                    <Button icon="th" onClick={handleChatVisibility} minimal large fill />
                </div>
            </Card>
           </Card>
        </div>
    );
}

export default Chat;
