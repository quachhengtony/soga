import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Chat.css";
import db from "../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
  const { roomId, workspaceId } = useParams();
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (workspaceId && roomId) {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__body">
        <div className="messageContainer">
          {roomMessages.map(({ message, timestamp, user, userImage, date }) => (
            <Message
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
              date={date}
            />
          ))}
        </div>
      </div>
      <ChatInput
        className="chat_input"
        roomName={roomDetails?.name}
        roomId={roomId}
        workspaceId={workspaceId}
      />
    </div>
  );
}

export default Chat;
