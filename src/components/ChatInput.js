import { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import SendIcon from "@atlaskit/icon/glyph/send";
import EmojiIcon from "@atlaskit/icon/glyph/emoji";
import HipchatSdVideoIcon from "@atlaskit/icon/glyph/hipchat/sd-video";
import VidShareScreenIcon from "@atlaskit/icon/glyph/vid-share-screen";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import { v1 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

import "./ChatInput.css";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

function ChatInput({ roomName, roomId, workspaceId }) {
  const input = useRef("");
  const [{ user }] = useStateValue();

  const history = useHistory();
  const [currentDate, setCurrentDate] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (user && workspaceId && roomId && input.current.value != "") {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          message: input.current.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
          date: currentDate ? currentDate : "...",
        })
        .then(() => console.log("Message sent"))
        .catch(err => console.log(err))
    }
    input.current.value = "";
  };

  const sendMessageWithKey = (e) => {
    if (e.keyCode === 13) {
      if (user && workspaceId && roomId && input.current.value != "") {
        db.collection("workspaces")
          .doc(workspaceId)
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            message: input.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
            date: currentDate ? currentDate : "...",
          })
          .then(() => console.log("Message sent"))
          .catch(err => console.log(err))
      }
      input.current.value = "";
    }
  };

  const createRoomVideoConference = () => {
    const id = uuid();
    history.push(`video/${id}`);
  };

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setCurrentDate(today);
  };

  useEffect(() => {
    getCurrentDate();
  }, []);

  return (
    <div className="chatinput">
      <div className="textfield__container">
        <Textfield
          ref={input}
          onKeyDown={sendMessageWithKey}
          className="textfield"
          name="basic"
        />
      </div>
      <div classname="buttons__container">
        <Button
          className="chatInput__button"
          appearance="primary"
          iconBefore={<AttachmentIcon label="" />}
        ></Button>
        <Button
          className="chatInput__button"
          appearance="primary"
          iconBefore={<VidShareScreenIcon label="" />}
        ></Button>
        <Button
          className="chatInput__button"
          onClick={createRoomVideoConference}
          appearance="primary"
          iconBefore={<HipchatSdVideoIcon label="" />}
        ></Button>
        <Button
          className="chatInput__button"
          appearance="primary"
          iconBefore={<EmojiIcon label="" />}
        ></Button>
        <Button
          className="chatInput__button"
          onClick={sendMessage}
          appearance="primary"
          iconBefore={<SendIcon label="" />}
        ></Button>
      </div>
    </div>
  );
}

export default ChatInput;
