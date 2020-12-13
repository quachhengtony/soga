import Avatar, { AvatarItem } from '@atlaskit/avatar';
import { memo } from 'react';
import './Message.css';

function Message({ message, user, timestamp, userImage }) {
    return (
        <div className="message">
            <AvatarItem
                className="message_item"
                avatar={<Avatar src={userImage} appearance='square' presence="online" />}
                primaryText={user}
                secondaryText={message} />
        </div>
    );
}
// <p>{user}, {new Date(timestamp?.toDate()).toUTCString()}</p>

export default memo(Message);
