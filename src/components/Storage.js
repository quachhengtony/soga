import { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import BitbucketCloneIcon from '@atlaskit/icon/glyph/bitbucket/clone';
import WatchIcon from '@atlaskit/icon/glyph/watch';

import './Storage.css';
import db, { storage } from '../firebase';
import { useStateValue } from '../StateProvider';

export default function Storage() {

    const [{ user }] = useStateValue();
    const { workspaceId } = useParams();

    const [workdriveFiles, setWorkdriveFiles] = useState([]);
    const [groupToGetFiles, setGroupToGetFiles] = useState();
    const [currentDate, setCurrentDate]= useState();

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    // const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
    const [groupToCreate, setGroupToCreate] = useState("");
    const [groupToUpload, setGroupToUpload] = useState("");

    const getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        setCurrentDate(today);
    }

    // const CreateGroupBody = (e) => (
    //     <div style={{ margin: "0 25px 0" }}>
    //         <label htmlFor="textfield">Enter a name</label>
    //         <Textfield value={groupToCreate} onChange={e => {setGroupToCreate(e.target.value)}} name="textfield" />
    //     </div>
    // )

    // const AddDocumentBody = () => (
    //     <div style={{ margin: "0 25px 0" }}>
    //         <label htmlFor="textfield">Enter a group name</label>
    //         <Textfield name="textfield" onFocus />
    //     </div>
    // )

    const createGroup = () => {
        if (groupToCreate != "") {
            db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupToCreate).set({
                groupName: groupToCreate,
                authorName: user?.displayName,
                authorId: user?.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    const triggerUploadFile = () => {
        document.getElementById("file_input").click();
    }

    const uploadFile = (e) => {
        var file = e.target.files[0];

        var storageRef = storage.ref();

        // Create the file metadata
        // var metadata = {
        //     contentType: 'image/jpeg'
        // };
        
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child(`workspaces/${file.name}`).put(file);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
            }, function(error) {
        
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
        
            case 'storage/canceled':
                // User canceled the upload
                break;
        
            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // const groupName = prompt("Group to push to:");
                if (groupToUpload != "") {
                    db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupToUpload).collection("dates").add({
                        fileName: file.name,
                        fileDownloadURL: downloadURL,
                        authorName: user?.displayName,
                        date: currentDate,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                }
            });
        });
    }

    const getWorkdriveFiles = (e)=> {
        if (e.keyCode === 13) {
            if (groupToGetFiles) {
                setGroupToUpload(groupToGetFiles);
                db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupToGetFiles).collection("dates")
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) => setWorkdriveFiles(snapshot.docs.map((doc) => doc.data())));
            }
        }
    }

    useEffect(() => {
        getCurrentDate();
    }, [])

    return (
        <div className="storage">
            <div className="storage__header">
                <div className="storageHeader__container --info">
                    <Textfield placeholder="Group name" value={groupToGetFiles} onChange={e => setGroupToGetFiles(e.target.value)} onKeyDown={getWorkdriveFiles} />
                </div>
                <div className="storageHeader__container --uploadButton">
                    <input id="file_input" type="file" onChange={uploadFile} hidden />
                    <ButtonGroup>
                        <Button onClick={() => {setIsCreateGroupModalOpen(true)}}>Create group</Button>
                        <Button onClick={triggerUploadFile} iconBefore={<FileIcon />} appearance="primary">Add document</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="storage__body">
                <p>Today</p>
                <div className="storageBody__filesContainer">
                    {workdriveFiles.map(({ fileDownloadURL, fileName, timestamp, date, authorName }) => (
                        <>
                            { new Date(timestamp?.toDate()).toLocaleDateString() == new Date().toLocaleDateString() ? 
                            (
                                <div className="storageBody__todayFilesContainer">
                                    <div className="storageBody__fileItem">
                                        <div className="storageBody__fileItemLeft">
                                        <div className="storageBody__fileButton">
                                            <Button className="fileButton" onClick={() => window.open(fileDownloadURL? fileDownloadURL : "#")} spacing="compact" appearance="link">{fileName}</Button>
                                        </div>
                                        <div className="storageBody__fileAuthor">
                                            <span>{authorName? authorName : "No author name"}<span style={{color: "#42526E"}}> uploaded on {date? date: "No date"} at {new Date(timestamp?.toDate()).getHours() + ":" + new Date(timestamp?.toDate()).getMinutes()}</span></span>
                                        </div>
                                        </div>
                                        <div className="storageBody__fileItemRight">
                                            <ButtonGroup>
                                                <Button iconBefore={<WatchIcon />} spacing="compact"></Button>
                                                <Button iconBefore={<LinkIcon />} spacing="compact"></Button>
                                                <Button iconBefore={<BitbucketCloneIcon />} spacing="compact"></Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            ) : (null)}
                        </>
                    ))}
                </div>
                <p>Past uploads</p>
                <div className="storageBody__filesContainer">
                    {workdriveFiles.map(({ fileDownloadURL, fileName, timestamp, date, authorName }) => (
                        <>
                            { new Date(timestamp?.toDate()).toLocaleDateString() != new Date().toLocaleDateString() ? 
                            (
                                <div className="storageBody__historyFilesContainer">
                                    <div className="storageBody__fileItem">
                                        <div className="storageBody__fileItemLeft">
                                        <div className="storageBody__fileButton">
                                            <Button className="fileButton" onClick={() => window.open(fileDownloadURL? fileDownloadURL : "#")} spacing="compact" appearance="link">{fileName}</Button>
                                        </div>
                                        <div className="storageBody__fileAuthor">
                                        <span>{authorName? authorName : "No author name"}<span style={{color: "#42526E"}}> uploaded on {date? date : "No date"} at {new Date(timestamp?.toDate()).getHours() + ":" + new Date(timestamp?.toDate()).getMinutes()}</span></span>
                                        </div>
                                        </div>
                                        <div className="storageBody__fileItemRight">
                                            <ButtonGroup>
                                                <Button iconBefore={<WatchIcon />} spacing="compact"></Button>
                                                <Button iconBefore={<LinkIcon />} spacing="compact"></Button>
                                                <Button iconBefore={<BitbucketCloneIcon />} spacing="compact"></Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            ) : (null)}
                        </>
                    ))}
                </div>
            </div>
            <ModalTransition>
            {isCreateGroupModalOpen && (
                <Modal
                    actions={[
                        { text: 'Create', onClick: () => {createGroup(); setIsCreateGroupModalOpen(false)}},
                        { text: 'Cancel', onClick: () => {setIsCreateGroupModalOpen(false)} },
                    ]}
                    onClose={() => {setIsCreateGroupModalOpen(false)}}
                    heading="File group">
                        <div>
                            <label htmlFor="textfield">Enter a group name</label>
                            <Textfield value={groupToCreate} onChange={e => setGroupToCreate(e.target.value)} name="textfield" onFocus />
                        </div>
                    </Modal>
                )}
            </ModalTransition>
            {/* <ModalTransition>
            {isAddDocumentModalOpen && (
                <Modal
                    actions={[
                    { text: 'Create', onClick: setIsAddDocumentModalOpen(false) },
                    { text: 'Cancel', onClick: setIsAddDocumentModalOpen(false) },
                    ]}
                    components={{Body: AddDocumentBody}}
                    onClose={null}
                    heading="Add a document"></Modal>
                )}
        </ModalTransition> */}
        </div>
    )
}