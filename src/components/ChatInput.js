import React, { useState } from 'react';
import firebase from 'firebase';
import {
    Button, 
    InputGroup
} from '@blueprintjs/core';

import './ChatInput.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function ChatInput({ roomName, roomId, workspaceId }) {

    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const sendMessage = e  => {
        e.preventDefault();
        if (roomId) {
            db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user?.photoURL,
            })
        }
    }

    const sendButton = (
        <Button icon="send-message" minimal onClick={sendMessage} />
    )

    return (
        <div className="chatInput">
            <InputGroup 
                className="chatInput_input"
                placeholder="Talk to your team"
                rightElement={sendButton}
                value={input}
                onChange={e => setInput(e.target.value)}
                large
            />
        </div>
    );
}

export default ChatInput;
