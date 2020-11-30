import { useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import BitbucketCommitsIcon from '@atlaskit/icon/glyph/bitbucket/commits';

import './Storage.css';
import db, { storage } from '../firebase';
import { useStateValue } from '../StateProvider';

export default function Storage() {

    const [{ user }] = useStateValue();
    const { workspaceId } = useParams();

    const [workdriveFiles, setWorkdriveFiles] = useState([]);

    const [groupToPushTo, setGroupToPushTo] = useState();
    const [groupToGetFiles, setGroupToGetFiles] = useState();

    const createGroup = () => {
        const groupName = prompt("Enter group name:");
        if (groupName) {
            db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupName).set({
                name: groupName,
            })
        }
    }

    const triggerUploadFile = () => {
        document.getElementById("file_input").click();
    }

    const uploadFile = (e) => {
        var file = e.target.files[0];
        // setFileName(file.name);

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
                const groupName = prompt("Group to push to:");
                if (groupName) {
                    db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupName).collection("files").add({
                        fileDownloadURL0: downloadURL,
                        fileName0: e.target.files[0].name,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        user: user.displayName,
                    })
                }
            });
        });
    }

    const getWorkdriveFiles = (e)=> {
        if (e.keyCode === 13) {
            if (groupToGetFiles) {
                db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupToGetFiles).collection("files").orderBy("timestamp", "asc").onSnapshot((snapshot) => setWorkdriveFiles(snapshot.docs.map((doc) => doc.data())));
            }
        }
    }

    return (
        <div className="storage">
            <div className="storage__header">
                <div className="storageHeader__container --info">
                    <Textfield placeholder="Group name" value={groupToGetFiles} onChange={e => setGroupToGetFiles(e.target.value)} onKeyDown={getWorkdriveFiles} />
                </div>
                <div className="storageHeader__container --uploadButton">
                    <input id="file_input" type="file" onChange={uploadFile} hidden />
                    <ButtonGroup>
                        <Button onClick={createGroup}>Create group</Button>
                        <Button onClick={triggerUploadFile} iconBefore={<FileIcon />} appearance="primary">Add document</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="storage__body">
                    {workdriveFiles.map(({ fileDownloadURL0, fileName0, timestamp, user }) => (
                        <div className="storageBody__filesContainer">
                            <p>Files on { new Date(timestamp?.toDate()).toLocaleDateString() }</p>
                            <div className="storageBody__fileItem">
                                <div className="storageBody__fileItemLeft">
                                <div className="storageBody__fileButton">
                                    <Button className="fileButton" onClick={() => window.open(fileDownloadURL0)} spacing="compact" appearance="link">{fileName0}</Button>
                                </div>
                                <div className="storageBody__fileAuthor">
                                    <Button className="authorButton" spacing="compact" appearance="subtle-link">{user}</Button>
                                </div>
                                </div>
                                <div className="storageBody__fileItemRight">
                                    <ButtonGroup>
                                        <Button iconBefore={<LinkIcon />} spacing="compact"></Button>
                                        <Button iconBefore={<BitbucketCommitsIcon />} spacing="compact"></Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

