import { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";

import "./Manage.css";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import ListWorkspace from "./ListWorkspace";

function Manage() {
  const [workspaces, setWorkspaces] = useState([]);
  const { user } = useStateValue();
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState(
    false
  );
  const workspaceName = useRef("");
  const [currentDate, setCurrentDate] = useState();
  const [isBusinessUser, setIsBusinessUser] = useState(false);

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setCurrentDate(today);
  };

  const createWorkspace = async () => {
    await db.collection("workspaces").add({
      workspaceName: workspaceName,
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorId: user?.uid,
      date: currentDate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  useEffect(() => {
    if (!!user) {
      db.collection("businessAccounts")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setIsBusinessUser(true);
          } else {
            setIsBusinessUser(false);
          }
        });

      db.collection("workspaces")
        .where("authorId", "==", user.uid)
        .onSnapshot((snapshot) =>
          setWorkspaces(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().workspaceName,
              date: doc.data().date,
            }))
          )
        );
      getCurrentDate();
    }
  }, [workspaces]);

  return (
    <div className="dashboard">
      {isBusinessUser ? (
        <>
          <div className="overview">
            <p className="p --header">Overview</p>
            <div className="analytics">
              <div className="analytics__box">
                <p>Workspaces created</p>
                <p className="p --analyticsNumber">3/5</p>
              </div>
              <div className="analytics__box">
                <p>Storage used</p>
                <p className="p --analyticsNumber">0.4/5GB</p>
              </div>
              <div className="analytics__box">
                <p>Other analytics</p>
                <p className="p --analyticsNumber">69/100</p>
              </div>
            </div>
          </div>
          <div className="control">
            <div className="workspaces">
              <div className="workspaces__header">
                <p className="p --header">Workspaces</p>
                <Button
                  spacing="compact"
                  appearance="primary"
                  onClick={() => setIsCreateWorkspaceModalOpen(true)}
                >
                  New workspace
                </Button>
              </div>
              {workspaces.map((workspace, index) => (
                <ListWorkspace
                  id={workspace.id}
                  name={workspace.name}
                  date={workspace.date}
                  key={index}
                />
              ))}
            </div>
            <div className="admins">
              <p className="p --header">Admins</p>
            </div>
          </div>
          <ModalTransition>
            {isCreateWorkspaceModalOpen && (
              <Modal
                actions={[
                  {
                    text: "Create",
                    onClick: () => {
                      createWorkspace();
                      setIsCreateWorkspaceModalOpen(false);
                    },
                  },
                  {
                    text: "Cancel",
                    onClick: () => {
                      setIsCreateWorkspaceModalOpen(false);
                    },
                  },
                ]}
                onClose={() => {
                  setIsCreateWorkspaceModalOpen(false);
                }}
                heading="Workspace"
              >
                <div>
                  <label htmlFor="textfield">Enter a workspace name</label>
                  <Textfield ref={workspaceName} name="textfield" onFocus />
                </div>
              </Modal>
            )}
          </ModalTransition>
        </>
      ) : (
        <p>ACCESS DENIED</p>
      )}
    </div>
  );
}

export default Manage;
