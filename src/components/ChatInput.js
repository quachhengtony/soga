// import { useRef, useEffect, useState } from "react";
// import firebase from "firebase";
// import Button from "@atlaskit/button";
// import Textfield from "@atlaskit/textfield";
// import SendIcon from "@atlaskit/icon/glyph/send";
// import EmojiIcon from "@atlaskit/icon/glyph/emoji";
// import HipchatSdVideoIcon from "@atlaskit/icon/glyph/hipchat/sd-video";
// import VidShareScreenIcon from "@atlaskit/icon/glyph/vid-share-screen";
// import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
// import { v1 as uuid } from "uuid";
// import { useHistory } from "react-router-dom";

// import "./ChatInput.css";
// import db from "../adapters/firebase";
// import { useStateValue } from "../StateProvider";

// function ChatInput({ roomName, roomId, workspaceId }) {
//   const input = useRef("");
//   const { user } = useStateValue();

//   const history = useHistory();
//   const [currentDate, setCurrentDate] = useState("");

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (user && workspaceId && roomId && input.current.value != "") {
//       db.collection("workspaces")
//         .doc(workspaceId)
//         .collection("rooms")
//         .doc(roomId)
//         .collection("messages")
//         .add({
//           message: input.current.value,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//           user: user.displayName,
//           userImage: user.photoURL,
//           date: currentDate ? currentDate : "...",
//         })
//         .then(() => console.log("Message sent"))
//         .catch(err => console.log(err))
//     }
//     input.current.value = "";
//   };

//   const sendMessageWithKey = (e) => {
//     if (e.keyCode === 13) {
//       if (user && workspaceId && roomId && input.current.value != "") {
//         db.collection("workspaces")
//           .doc(workspaceId)
//           .collection("rooms")
//           .doc(roomId)
//           .collection("messages")
//           .add({
//             message: input.current.value,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             user: user.displayName,
//             userImage: user.photoURL,
//             date: currentDate ? currentDate : "...",
//           })
//           .then(() => console.log("Message sent"))
//           .catch(err => console.log(err))
//       }
//       input.current.value = "";
//     }
//   };

//   const createRoomVideoConference = () => {
//     const id = uuid();
//     history.push(`video/${id}`);
//   };

//   const getCurrentDate = () => {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, "0");
//     var mm = String(today.getMonth() + 1).padStart(2, "0");
//     var yyyy = today.getFullYear();
//     today = dd + "/" + mm + "/" + yyyy;
//     setCurrentDate(today);
//   };

//   useEffect(() => {
//     getCurrentDate();
//   }, []);

//   return (
//     <div className="chatinput">
//       <div className="textfield__container">
//         <Textfield
//           ref={input}
//           onKeyDown={sendMessageWithKey}
//           className="textfield"
//           name="basic"
//         />
//       </div>
//       <div classname="buttons__container">
//         <Button
//           className="chatInput__button"
//           appearance="primary"
//           iconBefore={<AttachmentIcon label="" />}
//         ></Button>
//         <Button
//           className="chatInput__button"
//           appearance="primary"
//           iconBefore={<VidShareScreenIcon label="" />}
//         ></Button>
//         <Button
//           className="chatInput__button"
//           onClick={createRoomVideoConference}
//           appearance="primary"
//           iconBefore={<HipchatSdVideoIcon label="" />}
//         ></Button>
//         <Button
//           className="chatInput__button"
//           appearance="primary"
//           iconBefore={<EmojiIcon label="" />}
//         ></Button>
//         <Button
//           className="chatInput__button"
//           onClick={sendMessage}
//           appearance="primary"
//           iconBefore={<SendIcon label="" />}
//         ></Button>
//       </div>
//     </div>
//   );
// }

// export default ChatInput;

import { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { v1 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

import "../styles/ChatInput.css";
import db from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function ChatInput({ roomName, roomId, workspaceId }) {
  const input = useRef("");
  const { user, currentDate } = useStateValue();
  const history = useHistory();
  const { currentUserName, currentUserEmail, currentUserUUId } = useCurrentUserDetails();

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
          user: currentUserName,
          userImage: "https://www.pngrepo.com/download/26474/avatar.png",
          date: currentDate ? currentDate : "...",
        })
        .then(() => console.log("Message sent"))
        .catch((err) => console.log(err));
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
            user: currentUserName,
            userImage: "https://www.pngrepo.com/download/26474/avatar.png",
            date: currentDate ? currentDate : "...",
          })
          .then(() => console.log("Message sent"))
          .catch((err) => console.log(err));
      }
      input.current.value = "";
    }
  };

  // const createRoomVideoConference = () => {
  //   const id = uuid();
  //   history.push(`video/${id}`);
  // };

  return (
    <div className="chatinput">
      <input
        ref={input}
        onKeyDown={sendMessageWithKey}
        type="text"
        className="form-control"
        placeholder="Hi @Tony..."
      />
      <a
        href="javascript:void(0)"
        onClick={sendMessage}
        class="btn btn-white btn-icon chatinput__btn"
        aria-label="Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="10" y1="14" x2="21" y2="3" />
          <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
      </a>
      <a
        href="javascript:void(0)"
        onClick={sendMessage}
        class="btn btn-white btn-icon chatinput__btn"
        aria-label="Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="15" y1="8" x2="15.01" y2="8" />
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
          <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
        </svg>
      </a>

      <a
        href="javascript:void(0)"
        onClick={sendMessage}
        class="btn btn-white btn-icon chatinput__btn"
        aria-label="Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
      </a>

      <a
        href="javascript:void(0)"
        onClick={sendMessage}
        class="btn btn-white btn-icon chatinput__btn"
        aria-label="Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
          <rect x="3" y="6" width="12" height="12" rx="2" />
        </svg>
      </a>

      <a
        href="javascript:void(0)"
        onClick={sendMessage}
        class="btn btn-white btn-icon chatinput__btn"
        aria-label="Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9" />
          <line x1="7" y1="20" x2="17" y2="20" />
          <line x1="9" y1="16" x2="9" y2="20" />
          <line x1="15" y1="16" x2="15" y2="20" />
          <path d="M17 4h4v4" />
          <path d="M16 9l5 -5" />
        </svg>
      </a>
    </div>
  );
}

export default ChatInput;
