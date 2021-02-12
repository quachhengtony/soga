import { useRef, useEffect } from "react";
import db from "../adapters/firebase";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function CreateWorkpsaceModal(props) {
  const workspaceName = useRef("");
  const { user, currentDate } = useStateValue();
  const { currentUserName, currentUserEmail, currentUserUUId, currentUserRole, currentUserBusinessName } = useCurrentUserDetails();

  const handleCreateWorkspace = async () => {
    if (workspaceName.current.value !== "") {
      await db
        .collection("workspaces")
        .doc(props.workspaceUUID)
        .set({
          workspaceName: workspaceName.current.value,
          authorName: currentUserName,
          authorEmail: currentUserEmail,
          authorId: currentUserUUId,
          authorRole: currentUserRole,
          authorBusinessName: currentUserBusinessName,
          date: currentDate,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("rooms")
            .add({
              roomName: "General",
              authorName: currentUserName,
              authorEmail: currentUserEmail,
              authorId: currentUserUUId,
              date: currentDate,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("storage")
            .doc("Main")
            .set({
              groupName: "Main",
              authorName: currentUserName,
              authorId: currentUserUUId,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("settings")
            .doc("link")
            .set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("settings")
            .doc("link")
            .collection("users")
            .add({
              userEmail: currentUserEmail,
              isAdmin: true,
              date: currentDate,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .catch((error) => console.error(error));
    } else return;

    workspaceName.current.value = "";
  };

  return (
    <div
      className="modal modal-blur fade"
      id="modal-new-workspace"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      style={{ paddingTop: "100px" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New workspace</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="Your workspace's name"
                ref={workspaceName}
              />
            </div>
            <label className="form-label">Workspace type</label>
            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    defaultValue={1}
                    className="form-selectgroup-input"
                    defaultChecked
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Simple
                      </span>
                      <span className="d-block text-muted">
                        Basic rooms and a main document group
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    defaultValue={1}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Advanced
                      </span>
                      <span className="d-block text-muted">
                        Rooms and document groups to streamline professional works
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="form-selectgroup-boxes row mb-3">
            <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    defaultValue={1}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title mb-1">
                        More workspace templates
                      </span>
                      <span className="d-block text-muted">
                        
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              {/* <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    defaultValue={1}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Advanced
                      </span>
                      <span className="d-block text-muted">
                        Rooms and document groups to streamline professional works
                      </span>
                    </span>
                  </span>
                </label>
              </div> */}
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="mb-3">
                  <label className="form-label">Workspace ID</label>
                  <div className="input-group input-group-flat">
                    <span className="input-group-text">workspace/</span>
                    <input
                      type="text"
                      className="form-control ps-0"
                      defaultValue={props.workspaceUUID}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Visibility</label>
                  <select className="form-select">
                    <option value={1} selected>
                      Private
                    </option>
                    <option value={2}>Public</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="modal-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Client name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Reporting period</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div>
                  <label className="form-label">Additional information</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="modal-footer">
            <a
              href="#"
              className="btn btn-link link-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </a>
            <a
              className="btn btn-primary ms-auto"
              data-bs-dismiss="modal"
              onClick={handleCreateWorkspace}
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
              Create new workspace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkpsaceModal;
