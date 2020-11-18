import { Blockquote } from '@blueprintjs/core';
import React from 'react';
import './Message.css';

function Message({ message, user, timestamp, userImage }) {
    return (
        <div className="message">
            <div >
                <img src={userImage} alt="Avatar" className="message_avatar"></img>
            </div>
            <div>
                <p><b>{user}</b></p>
                {message}
            </div>
        </div>
    );
}
// <p>{user}, {new Date(timestamp?.toDate()).toUTCString()}</p>

export default Message;
