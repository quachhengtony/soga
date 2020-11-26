import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import Button from '@atlaskit/button';
import FileIcon from '@atlaskit/icon/glyph/file';
// import UploadIcon from '@atlaskit/icon/glyph/upload';

import './Storage.css';
import db, { storage } from '../firebase';
import { useStateValue } from '../StateProvider';

export default function Storage() {

    const [{ user }] = useStateValue();
    const { workspaceId } = useParams();

    const [fileName, setFileName] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState(null);
    const [workdriveFiles, setWorkdriveFiles] = useState([]);

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
        db.collection("workspaces").doc(workspaceId).collection("storage").add({
            fileDownloadURL0: fileDownloadURL,
            fileName0: fileName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
        })
    }

    const getWorkdriveFiles = () => {
        db.collection("workspaces").doc(workspaceId).collection("storage").orderBy("timestamp", "asc").onSnapshot((snapshot) => setWorkdriveFiles(snapshot.docs.map((doc) => doc.data())));
    }

    useEffect(() => {
        getWorkdriveFiles();
    })

    return (
        <div className="workdrive">
            <div className="workdrive_header">
                <div className="info">
                    <h2>Storage</h2>
                </div>
                <div className="uploadButton">
                    <input id="file_input" type="file" onChange={uploadFile} hidden />
                    <Button onClick={triggerUploadFile} iconBefore={<FileIcon />} appearance="primary">Upload a file</Button>
                    <Button onClick={pushFileToFirestore}>Push</Button>
                </div>
            </div>
            <div className="workdrive_body">
                    {workdriveFiles.map(({ fileDownloadURL0, fileName0, timestamp, user }) => (
                        <div>
                            <p><blockquote>{new Date(timestamp?.toDate()).toUTCString()}</blockquote></p>
                            <a href={`${fileDownloadURL0}`}>{fileName0}</a> {user}
                        </div>
                    ))}
                {/* <UploadIcon label="Upload" size="xlarge" primaryColor="#0747A6" /> */}
            </div>
        </div>
    )
}

