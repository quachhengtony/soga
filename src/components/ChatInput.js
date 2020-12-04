import { useState } from 'react';
import firebase from 'firebase';
import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from "@atlaskit/textfield";
import SendIcon from '@atlaskit/icon/glyph/send';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import HipchatSdVideoIcon from '@atlaskit/icon/glyph/hipchat/sd-video';
import VidShareScreenIcon from '@atlaskit/icon/glyph/vid-share-screen';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import { v1 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';

import './ChatInput.css';
import db, { storage } from '../firebase';
import { useStateValue } from '../StateProvider';

function ChatInput({ roomName, roomId, workspaceId }) {

    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const history = useHistory();

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
        setInput("");
    }

    const sendMessageWithKey = e => {
        if (e.keyCode === 13) {
            if (roomId) {
                db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('messages').add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user?.photoURL,
                })
            }
            setInput("");
        }
    }

    const createRoomVideoConference = () => {
        const id = uuid();
        history.push(`video/${id}`);
    }

    return (
        <div className="chatinput">
            <div className="textfield_container">
                <Textfield value={input} onChange={e => setInput(e.target.value)} onKeyDown={sendMessageWithKey} className="textfield" name="basic" />
            </div>
            <div classname="buttons_container">
                <Button className="button" appearance="primary" iconBefore={<AttachmentIcon label="" />}></Button>
                <Button className="button" appearance="primary" iconBefore={<VidShareScreenIcon label="" />}></Button>
                <Button className="button" onClick={createRoomVideoConference} appearance="primary" iconBefore={<HipchatSdVideoIcon label="" />}></Button>
                <Button className="button" appearance="primary" iconBefore={<EmojiIcon label="" />}></Button>
                <Button className="button" onClick={sendMessage} appearance="primary" iconBefore={<SendIcon label="" />}></Button>
            </div>
        </div>
    );
}

export default ChatInput;
