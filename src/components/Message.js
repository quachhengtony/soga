import React from 'react';
import './Message.css';
import {
    Card
} from '@blueprintjs/core';

function Message({ message, user, timestamp, userImage }) {
    return (
        <div className="message">
            <p>{user}, {new Date(timestamp?.toDate()).toUTCString()}</p>
            <blockquote className="bp3-blockquote">
                {message}
            </blockquote>
        </div>
    );
}

export default Message;
