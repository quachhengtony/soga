import { useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";

import db from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function CreateRoom() {
  const { workspaceId } = useParams();
  const { user, currentDate } = useStateValue();
  const { currentUserName, currentUserEmail, currentUserUUId } = useCurrentUserDetails();

  const createRoom = () => {
    const roomName = prompt("Enter room name:");
    if (roomName) {
      db.collection("workspaces").doc(workspaceId).collection("rooms").add({
        roomName: roomName,
        authorName: currentUserName,
        authorEmail: currentUserEmail,
        authorId: currentUserUUId,
        date: currentDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <a href="javascript:void(0)" onClick={createRoom} className="dropdown-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon dropdown-item-icon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      New room
    </a>
  );
}

export default CreateRoom;
