// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import firebase from "firebase";

// import "../styles/Storage.css";
// import db, { storage } from "../adapters/firebase";
// import { useStateValue } from "../contexts/StateProvider";
// import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

// export default function Storage() {
//   const { user, currentDate } = useStateValue();
//   const { currentUserName, currentUserEmail, currentUserUUId } = useCurrentUserDetails();
//   const { workspaceId } = useParams();

//   const [files, setFiles] = useState([]);
//   const [groupToGetFiles, setGroupToGetFiles] = useState();

//   const [storageGroups, setStorageGroups] = useState([]);
//   const [groupToUpload, setGroupToUpload] = useState("");

//   const createGroup = () => {
//     const groupToCreate = prompt("Choose a group name:");
//     if (groupToCreate !== "") {
//       db.collection("workspaces")
//         .doc(workspaceId)
//         .collection("storage")
//         .doc(groupToCreate)
//         .set({
//           groupName: groupToCreate,
//           authorName: currentUserName,
//           authorId: currentUserUUId,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//     }
//   };

//   const triggerUploadFile = () => {
//     document.getElementById("file_input").click();
//   };

//   const uploadFile = (e) => {
//     if (groupToUpload !== "") {
//       var file = e.target.files[0];

//       var storageRef = storage.ref();

//       // Create the file metadata
//       // var metadata = {
//       //     contentType: 'image/jpeg'
//       // };

//       // Upload file and metadata to the object 'images/mountains.jpg'
//       var uploadTask = storageRef.child(`workspaces/${file.name}`).put(file);

//       // Listen for state changes, errors, and completion of the upload.
//       uploadTask.on(
//         firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//         function (snapshot) {
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           var progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case firebase.storage.TaskState.PAUSED: // or 'paused'
//               console.log("Upload is paused");
//               break;
//             case firebase.storage.TaskState.RUNNING: // or 'running'
//               console.log("Upload is running");
//               break;
//           }
//         },
//         function (error) {
//           // A full list of error codes is available at
//           // https://firebase.google.com/docs/storage/web/handle-errors
//           switch (error.code) {
//             case "storage/unauthorized":
//               // User doesn't have permission to access the object
//               break;

//             case "storage/canceled":
//               // User canceled the upload
//               break;

//             case "storage/unknown":
//               // Unknown error occurred, inspect error.serverResponse
//               break;
//           }
//         },
//         function () {
//           // Upload completed successfully, now we can get the download URL
//           uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             //   const groupName = prompt("Group to push to:");
//             //   if (groupName !== "") {
//             db.collection("workspaces")
//               .doc(workspaceId)
//               .collection("storage")
//               .doc(groupToUpload)
//               .collection("dates")
//               .add({
//                 fileName: file.name,
//                 fileDownloadURL: downloadURL,
//                 authorName: currentUserName,
//                 authorEmail: currentUserEmail,
//                 authorPhoto: "https://www.pngrepo.com/download/26474/avatar.png",
//                 date: currentDate,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//               });
//             //   }
//           });
//         }
//       );
//     }
//   };

//   const getFiles = (groupName) => {
//     db.collection("workspaces")
//       .doc(workspaceId)
//       .collection("storage")
//       .doc(groupName)
//       .collection("dates")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) =>
//         setFiles(snapshot.docs.map((doc) => doc.data()))
//       );
//   };

//   const getStorageGroups = () => {
//     db.collection("workspaces")
//       .doc(workspaceId)
//       .collection("storage")
//       .orderBy("timestamp", "asc")
//       .onSnapshot((snapshot) =>
//         setStorageGroups(snapshot.docs.map((doc) => doc.data()))
//       );
//   };

//   useEffect(() => {
//     getStorageGroups();
//   }, []);

//   return (
//     <div className="storage">
//       <ol class="breadcrumb" aria-label="breadcrumbs">
//         <li class="breadcrumb-item">
//           <a href="javascript:void(0)">Workspace</a>
//         </li>
//         <li class="breadcrumb-item active" aria-current="page">
//           <a href="javascript:void(0)">Storage</a>
//         </li>
//       </ol>
//       <div className="card --storage-header-card">
//         <div className="card-body">
//           <div>
//             <div class="form-label">Document group:</div>
//             <select
//               class="form-select"
//               value={groupToGetFiles}
//               defaultValue={groupToGetFiles}
//               onChange={(e) => {
//                 getFiles(e.target.value);
//                 setGroupToUpload(e.target.value);
//               }}
//             >
//               {storageGroups.map((storageGroup, index) => (
//                 <option value={storageGroup.groupName}>
//                   {storageGroup.groupName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <input id="file_input" type="file" onChange={uploadFile} hidden />
//             <button
//               type="button"
//               className="btn btn-light d-none d-sm-inline-block --storage-btn"
//               onClick={createGroup}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="icon"
//                 width={24}
//                 height={24}
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <line x1={12} y1={5} x2={12} y2={19} />
//                 <line x1={5} y1={12} x2={19} y2={12} />
//               </svg>
//               New group
//             </button>

//             <button
//               type="button"
//               className="btn btn-light d-none d-sm-inline-block --storage-btn"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="icon"
//                 width={24}
//                 height={24}
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <circle cx="12" cy="12" r="2" />
//                 <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
//               </svg>
//               Watch
//             </button>

//             <button
//               type="button"
//               className="btn btn-primary d-none d-sm-inline-block --storage-btn"
//               data-bs-toggle="modal"
//               data-bs-target="#modal-report"
//               onClick={triggerUploadFile}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="icon"
//                 width={24}
//                 height={24}
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <path d="M14 3v4a1 1 0 0 0 1 1h4" />
//                 <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
//                 <line x1="12" y1="11" x2="12" y2="17" />
//                 <polyline points="9 14 12 11 15 14" />
//               </svg>
//               Add document
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="card --storage-body-card">
//         <div className="card-header">
//           <h3 className="card-title">Today</h3>
//         </div>
//         {files.map(
//           ({
//             fileDownloadURL,
//             fileName,
//             timestamp,
//             date,
//             authorName,
//             authorEmail,
//             authorPhoto,
//           }) => (
//             <>
//               {new Date(timestamp?.toDate()).toLocaleDateString() ===
//               new Date().toLocaleDateString() ? (
//                 <div className="list-group list-group-flush list-group-hoverable">
//                   <div className="list-group-item">
//                     <div className="row align-items-center">
//                       <div className="col-auto">
//                         <a href="#">
//                           <span
//                             className="avatar"
//                             style={{ backgroundImage: `url(${authorPhoto})` }}
//                           />
//                         </a>
//                       </div>
//                       <div className="col text-truncate">
//                         <a
//                           href={fileDownloadURL}
//                           target="__blank"
//                           className="text-body d-block"
//                         >
//                           {fileName}
//                         </a>
//                         <small className="d-block text-muted text-truncate mt-n1">
//                           {authorName} added on {date}
//                         </small>
//                       </div>
//                       <div className="col-auto">
//                         <a href="#" className="list-group-item-actions">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="icon text-muted"
//                             width={24}
//                             height={24}
//                             viewBox="0 0 24 24"
//                             strokeWidth={2}
//                             stroke="currentColor"
//                             fill="none"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                             <path d="M14 3v4a1 1 0 0 0 1 1h4" />
//                             <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
//                             <line x1="12" y1="11" x2="12" y2="17" />
//                             <polyline points="9 14 12 17 15 14" />
//                           </svg>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </>
//           )
//         )}
//       </div>

//       <div className="card --storage-body-card">
//         <div className="card-header">
//           <h3 className="card-title">Past uploads</h3>
//         </div>
//         {files.map(
//           ({
//             fileDownloadURL,
//             fileName,
//             timestamp,
//             date,
//             authorName,
//             authorEmail,
//             authorPhoto,
//           }) => (
//             <>
//               {new Date(timestamp?.toDate()).toLocaleDateString() !==
//               new Date().toLocaleDateString() ? (
//                 <div className="list-group list-group-flush list-group-hoverable">
//                   <div className="list-group-item">
//                     <div className="row align-items-center">
//                       <div className="col-auto">
//                         <a href="#">
//                           <span
//                             className="avatar"
//                             style={{ backgroundImage: `url(${authorPhoto})` }}
//                           />
//                         </a>
//                       </div>
//                       <div className="col text-truncate">
//                         <a
//                           href={fileDownloadURL}
//                           target="__blank"
//                           className="text-body d-block"
//                         >
//                           {fileName}
//                         </a>
//                         <small className="d-block text-muted text-truncate mt-n1">
//                           {authorName} added on {date}
//                         </small>
//                       </div>
//                       <div className="col-auto">
//                         <a href="#" className="list-group-item-actions">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="icon text-muted"
//                             width={24}
//                             height={24}
//                             viewBox="0 0 24 24"
//                             strokeWidth={2}
//                             stroke="currentColor"
//                             fill="none"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                             <path d="M14 3v4a1 1 0 0 0 1 1h4" />
//                             <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
//                             <line x1="12" y1="11" x2="12" y2="17" />
//                             <polyline points="9 14 12 17 15 14" />
//                           </svg>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";

import "../styles/Storage.css";
import db, { storage } from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

export default function Storage() {
  const { user, currentDate } = useStateValue();
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
  } = useCurrentUserDetails();
  const { workspaceId } = useParams();

  const [files, setFiles] = useState([]);
  const groupToGetFiles = useRef("");
  // const [groupToGetFiles, setGroupToGetFiles] = useState();

  const [storageGroups, setStorageGroups] = useState([]);
  const [groupToUpload, setGroupToUpload] = useState("");

  const createGroup = () => {
    const groupToCreate = prompt("Choose a group name:");
    if (groupToCreate !== "") {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("storage")
        .doc(groupToCreate)
        .set({
          groupName: groupToCreate,
          authorName: currentUserName,
          authorId: currentUserUUId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
  };

  const triggerUploadFile = () => {
    document.getElementById("file_input").click();
  };

  const uploadFile = (e) => {
    e.preventDefault();
    if (groupToGetFiles.current.value !== "") {
      var file = e.target.files[0];

      var storageRef = storage.ref();

      // Create the file metadata
      // var metadata = {
      //     contentType: 'image/jpeg'
      // };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(`workspaces/${file.name}`).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //   const groupName = prompt("Group to push to:");
            //   if (groupName !== "") {
            db.collection("workspaces")
              .doc(workspaceId)
              .collection("storage")
              .doc(groupToGetFiles.current.value)
              .collection("dates")
              .add({
                fileName: file.name,
                fileDownloadURL: downloadURL,
                authorName: currentUserName,
                authorEmail: currentUserEmail,
                authorPhoto:
                  "https://www.pngrepo.com/download/26474/avatar.png",
                date: currentDate,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            //   }
          });
        }
      );
    }
  };

  const getFiles = () => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("storage")
      .doc(groupToGetFiles.current.value)
      .collection("dates")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setFiles(snapshot.docs.map((doc) => doc.data()))
      );
  };

  const getStorageGroups = () => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("storage")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setStorageGroups(snapshot.docs.map((doc) => doc.data()))
      );
  };

  useEffect(() => {
    getStorageGroups();
  }, []);

  return (
    <div className="storage">
      <ol class="breadcrumb" aria-label="breadcrumbs">
        <li class="breadcrumb-item">
          <a href="javascript:void(0)">Workspace</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a href="javascript:void(0)">Storage</a>
        </li>
      </ol>
      <div className="card --storage-header-card">
        <div className="card-body">
          <div>
            <div class="form-label">Document group:</div>
            {/* <select
              class="form-select"
              value={groupToGetFiles}
              defaultValue={groupToGetFiles}
              onChange={(e) => {
                getFiles(e.target.value);
                setGroupToUpload(e.target.value);
              }}
            >
              {storageGroups.map((storageGroup, index) => (
                <option value={storageGroup.groupName}>
                  {storageGroup.groupName}
                </option>
              ))}
            </select> */}
            <select
              className="form-select"
              ref={groupToGetFiles}
              onChange={getFiles}
            >
              {storageGroups.map((storageGroup, index) => (
                <option key={index} value={storageGroup.groupName}>
                  {storageGroup.groupName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input id="file_input" type="file" onChange={uploadFile} hidden />
            <button
              type="button"
              className="btn btn-light d-none d-sm-inline-block --storage-btn"
              onClick={getFiles}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
              </svg>
              Refresh
            </button>
            <button
              type="button"
              className="btn btn-light d-none d-sm-inline-block --storage-btn"
              onClick={createGroup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
              New group
            </button>

            <button
              type="button"
              className="btn btn-light d-none d-sm-inline-block --storage-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
              </svg>
              Watch
            </button>

            <button
              type="button"
              className="btn btn-primary d-none d-sm-inline-block --storage-btn"
              data-bs-toggle="modal"
              data-bs-target="#modal-report"
              onClick={triggerUploadFile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <polyline points="9 14 12 11 15 14" />
              </svg>
              Add document
            </button>
          </div>
        </div>
      </div>
      <div className="card --storage-body-card">
        <div className="card-header">
          <h3 className="card-title">Today</h3>
        </div>
        {files.map(
          ({
            fileDownloadURL,
            fileName,
            timestamp,
            date,
            authorName,
            authorEmail,
            authorPhoto,
          }) => (
            <>
              {new Date(timestamp?.toDate()).toLocaleDateString() ===
              new Date().toLocaleDateString() ? (
                <div className="list-group list-group-flush list-group-hoverable">
                  <div className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <a href="#">
                          <span
                            className="avatar"
                            style={{ backgroundImage: `url(${authorPhoto})` }}
                          />
                        </a>
                      </div>
                      <div className="col text-truncate">
                        <a
                          href={fileDownloadURL}
                          target="__blank"
                          className="text-body d-block"
                        >
                          {fileName}
                        </a>
                        <small className="d-block text-muted text-truncate mt-n1">
                          {authorName} added on {date}
                        </small>
                      </div>
                      <div className="col-auto">
                        <a href="#" className="list-group-item-actions">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon text-muted"
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
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <polyline points="9 14 12 17 15 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )
        )}
      </div>

      <div className="card --storage-body-card">
        <div className="card-header">
          <h3 className="card-title">Past uploads</h3>
        </div>
        {files.map(
          ({
            fileDownloadURL,
            fileName,
            timestamp,
            date,
            authorName,
            authorEmail,
            authorPhoto,
          }) => (
            <>
              {new Date(timestamp?.toDate()).toLocaleDateString() !==
              new Date().toLocaleDateString() ? (
                <div className="list-group list-group-flush list-group-hoverable">
                  <div className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <a href="#">
                          <span
                            className="avatar"
                            style={{ backgroundImage: `url(${authorPhoto})` }}
                          />
                        </a>
                      </div>
                      <div className="col text-truncate">
                        <a
                          href={fileDownloadURL}
                          target="__blank"
                          className="text-body d-block"
                        >
                          {fileName}
                        </a>
                        <small className="d-block text-muted text-truncate mt-n1">
                          {authorName} added on {date}
                        </small>
                      </div>
                      <div className="col-auto">
                        <a href="#" className="list-group-item-actions">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon text-muted"
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
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <polyline points="9 14 12 17 15 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )
        )}
      </div>
    </div>
  );
}
