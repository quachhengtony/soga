import { useState, useEffect } from 'react';
import firebase from 'firebase';
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';

import './Manage.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import ListWorkspace from './ListWorkspace';

function Manage() {

    const [workspaces, setWorkspaces] = useState([]);
    const [{ user }] = useStateValue();
    const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState();
    const [currentDate, setCurrentDate] = useState();

    const getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        setCurrentDate(today);
    }

    const createWorkspace = () => {
        if (workspaceName != "") {
            db.collection("workspaces").add({
                workspaceName: workspaceName,
                authorName: user?.displayName,
                authorEmail: user?.email,
                authorId: user?.uid,
                date: currentDate,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    const getWorkspaces = () => {
        db.collection("workspaces").where("authorId", "==", user.uid).onSnapshot(snapshot => (
                setWorkspaces(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().workspaceName,
                    date: doc.data().date
                })))
        ))
    }

    useEffect(() => {
        getCurrentDate();
        getWorkspaces();
    })

    return (
        <div className="console">
            <div className="console_header">
                <h2>Workspace</h2>
                <p>Managing your talented remote teams via dedicated workspaces</p>
                <Button appearance='primary' className="createWorkspace_button" onClick={() => setIsCreateWorkspaceModalOpen(true)}>Create Workspace</Button>
            </div>
            <div className='console_body'>
                {workspaces.map((workspace, index) => (
                    <ListWorkspace id={workspace.id} name={workspace.name} date={workspace.date} key={index} />
                ))}
            </div>
            <ModalTransition>
                {isCreateWorkspaceModalOpen && (
                    <Modal
                        actions={[
                            { text: 'Create', onClick: () => {createWorkspace(); setIsCreateWorkspaceModalOpen(false)}},
                            { text: 'Cancel', onClick: () => {setIsCreateWorkspaceModalOpen(false)} },
                        ]}
                        onClose={() => {setIsCreateWorkspaceModalOpen(false)}}
                        heading="Workspace">
                            <div>
                                <label htmlFor="textfield">Enter a workspace name</label>
                                <Textfield value={workspaceName} onChange={e => setWorkspaceName(e.target.value)} name="textfield" onFocus />
                            </div>
                        </Modal>
                    )}
            </ModalTransition>
        </div>
    );
}

export default Manage;