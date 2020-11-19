// import React, { useState, useEffect } from 'react';
// import {
//     Divider,
//     Card,
//     Button
// } from '@blueprintjs/core';
// import { useParams } from 'react-router-dom';

// import './Chat.css';
// import db from '../firebase';
// import Message from './Message';
// import ChatInput from './ChatInput';
// import Board from './Board';
// import Schedule from './Schedule';

// function Chat() {

//     const { roomId, workspaceId } = useParams();
//     const [roomDetails, setRoomDetails] = useState(null);
//     const [roomMessages, setRoomMessages] = useState([]);

//     const [chatVisible, setChatVisible] = useState('');
//     const [boardVisible, setBoardVisible] = useState('none');
//     const [scheduleVisible, setScheduleVisible] = useState('none');

//     const [chatButtonIntent, setChatButtonIntent] = useState('primary');
//     const [boardButtonIntent, setBoardButtonIntent] = useState();

//     useEffect(() => {
//         if (roomId) {
//             db.collection('workspaces')
//                 .doc(workspaceId)
//                 .collection('rooms')
//                 .doc(roomId)
//                 .onSnapshot((snapshot) => setRoomDetails(snapshot.data())
//                 )
//         }
//         db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId)
//             .collection('messages')
//             .orderBy('timestamp', 'asc')
//             .onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map((doc) => doc.data()))
//             );
//     }, [roomId])
    
//     const handleChatVisibility = () => {
//         setChatVisible('none');
//         setBoardVisible('');
//         setScheduleVisible('none');
//         setBoardButtonIntent('primary');
//         setChatButtonIntent('');
//     }

//     const handleBoardVisibility = () => {
//         setBoardVisible('none');
//         setChatVisible('');
//         setScheduleVisible('none');
//         setChatButtonIntent('primary');
//         setBoardButtonIntent('');
//     }

//     const handleScheduleVisibility = () => {
//         setScheduleVisible('');

//         setChatVisible('none');
//         setBoardVisible('none');
//     }

//     return (
//         <div className="chat">
//             <Card className="chat_card">
//             <div className="chat_header">
//                     <Card className='chat_header_card nbr'>
//                         <div>
//                             <h5><mark>{roomDetails?.name}</mark></h5>
//                         </div>
//                         <div>
//                             <Button text='Chat' icon="chat" intent={chatButtonIntent} onClick={handleBoardVisibility} minimal />
//                             <Button text='Board' icon="th" intent={boardButtonIntent} onClick={handleChatVisibility} minimal />
//                             <Button text='Schedule' icon="calendar" onClick={handleScheduleVisibility} minimal />
//                         </div>
//                     </Card>
//                 </div>
//             <div style={{display: chatVisible}}>
//                 <div className="chat_body">
//                     <div className="chat_message">
//                         {roomMessages.map(({ message, timestamp, user, userImage }) => (
//                             <Message
//                                 message={message}
//                                 timestamp={timestamp}
//                                 user={user}
//                                 userImage={userImage}
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <ChatInput className="chat_input" roomName={roomDetails?.name} roomId={roomId} workspaceId={workspaceId} />
//             </div>
//             <div style={{display: boardVisible}}>
//                 <Board />
//             </div>
//             <div style={{display: scheduleVisible}}>
//                 <Schedule />
//             </div>
//            </Card>
//         </div>
//     );
// }

// export default Chat;

import React, { useState, useEffect } from 'react';
// import {
//     Divider,
//     Card,
//     Button
// } from '@blueprintjs/core';
import Button, { ButtonGroup } from '@atlaskit/button';
import { useParams } from 'react-router-dom';

import './Chat.css';
import db from '../firebase';
import Message from './Message';
import ChatInput from './ChatInput';
import Board from './Board';
import Schedule from './Schedule';

function Chat() {

    const { roomId, workspaceId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    const [chatVisible, setChatVisible] = useState('');
    const [boardVisible, setBoardVisible] = useState('none');
    const [scheduleVisible, setScheduleVisible] = useState('none');

    const [chatButtonIntent, setChatButtonIntent] = useState('true');
    const [boardButtonIntent, setBoardButtonIntent] = useState();
    const [scheduleButtonIntent, setScheduleButtonIntent] = useState();

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
        setScheduleVisible('none');

        setBoardButtonIntent('true');
        setChatButtonIntent('');
        setScheduleButtonIntent();
    }

    const handleBoardVisibility = () => {
        setBoardVisible('none');
        setChatVisible('');
        setScheduleVisible('none');

        setChatButtonIntent('true');
        setBoardButtonIntent('');
        setScheduleButtonIntent('');
    }

    const handleScheduleVisibility = () => {
        setScheduleVisible('');
        setChatVisible('none');
        setBoardVisible('none');

        setScheduleButtonIntent('true');
        setChatButtonIntent('');
        setBoardButtonIntent('');
    }

    return (
        <div className="chat">
            <div className="chat_card">
            {/* <div className="chat_header">
                    <div className='chat_header_card'>
                        <div>
                        <Button spacing="compact" appearance="subtle-link">{roomDetails?.name}</Button>
                        </div>
                        <div>
                            <ButtonGroup>
                                <Button spacing='compact' appearance="subtle" onClick={handleBoardVisibility} isSelected={chatButtonIntent}>Chat</Button>
                                <Button spacing='compact' appearance="subtle" onClick={handleChatVisibility} isSelected={boardButtonIntent}>Board</Button>
                                <Button spacing='compact' appearance="subtle" onClick={handleScheduleVisibility} isSelected={scheduleButtonIntent}>Schedule</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div> */}
            <div style={{display: chatVisible}}>
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
            {/* <div style={{display: boardVisible}}>
                <Board />
            </div>
            <div style={{display: scheduleVisible}}>
                <Schedule />
            </div> */}
           </div>
        </div>
    );
}

export default Chat;

