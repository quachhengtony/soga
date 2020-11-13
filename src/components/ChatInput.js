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
        <Button icon="send-message" intent='success' minimal active onClick={sendMessage} />
    )

    const emojiButton = (
        <Button icon="thumbs-up" intent='success' minimal active />
    )

    const attachFileButton = (
        <Button icon="paperclip" intent='success' minimal active />
    )

    const callButton = (
        <Button icon="mobile-video" intent='success' minimal active />
    )

    const screenShareButton = (
        <Button icon="desktop" intent='success' minimal active/>
    )

    return (
        <div className="chatInput">
            <InputGroup 
                className="chatInput_input"
                intent='success'
                placeholder="Talk to your team"
                leftElement={attachFileButton}
                rightElement={[sendButton, emojiButton, callButton, screenShareButton]}
                value={input}
                onChange={e => setInput(e.target.value)}
                large
            />
        </div>
    );
}

export default ChatInput;
