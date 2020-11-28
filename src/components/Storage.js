import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import Select from '@atlaskit/select';
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

    const [fileName, setFileName] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState(null);
    const [workdriveFiles, setWorkdriveFiles] = useState([]);

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
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        setFileName(await file.name);
        const fileRef = storageRef.child(`workspaces/oBNmn3i9Nym45Sjir5yR/${file.name}`);
        await fileRef.put(file).then(() => {
            console.log("File uploaded!")
        })
        setFileDownloadURL(await fileRef.getDownloadURL());
    }

    const pushFileToFirestore = () => {
        const groupToPushTo = prompt("Group to push to:");
        if (groupToPushTo) {
            db.collection("workspaces").doc(workspaceId).collection("storage").doc(groupToPushTo).collection("files").add({
                fileDownloadURL0: fileDownloadURL,
                fileName0: fileName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
            })
        }
    }

    const getWorkdriveFiles = () => {
        db.collection("workspaces").doc(workspaceId).collection("storage").doc("Sales").collection("files").orderBy("timestamp", "asc").onSnapshot((snapshot) => setWorkdriveFiles(snapshot.docs.map((doc) => doc.data())));
    }

    useEffect(() => {
        getWorkdriveFiles();
    })

    return (
        <div className="storage">
            <div className="storage__header">
                <div className="storageHeader__container --info">
                    <Select
                        className="single-select"
                        classNamePrefix="react-select"
                        options={[
                        { label: 'Group A', value: 'group a' },
                        { label: 'Group B', value: 'group b' },
                        { label: 'Group C', value: 'group c' },
                        ]}
                        placeholder="Group"
                    />
                </div>
                <div className="storageHeader__container --uploadButton">
                    <Button onClick={createGroup}>Create group</Button>
                    <input id="file_input" type="file" onChange={uploadFile} hidden />
                    <Button onClick={triggerUploadFile} iconBefore={<FileIcon />} appearance="primary">Add document</Button>
                    <Button onClick={pushFileToFirestore}>Push</Button>
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

