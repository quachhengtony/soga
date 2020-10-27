import React from 'react';
import './Chat.css';
import {
    Divider,
    Card
} from '@blueprintjs/core';

function Chat() {
    return (
        <div className="chat">
            <Card className="chat_card">
            <div className="chat_header">
                <h2 className="bp3-heading">Channel name</h2>
                <Divider />
            </div>
           </Card>
        </div>
    );
}

export default Chat;
