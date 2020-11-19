import Avatar, { AvatarItem } from '@atlaskit/avatar';
import React from 'react';
import './Message.css';

function Message({ message, user, timestamp, userImage }) {
    return (
        <div className="message">
            <AvatarItem
                avatar={<Avatar src={userImage} appearance='square' presence="online" />}
                primaryText={user}
                secondaryText={message} />
        </div>
    );
}
// <p>{user}, {new Date(timestamp?.toDate()).toUTCString()}</p>

export default Message;
