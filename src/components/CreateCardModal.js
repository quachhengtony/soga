import { useRef, useState, useEffect } from "react";
import db from "../adapters/firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import firebase from "firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function CreateCardModal({ columnId }) {
  const { user } = useStateValue();
  const cardTitle = useRef("");
  const cardBody = useRef("");
  const cardPriority = useRef("");
  const cardAssignee = useRef("");
  const cardDeadline = useRef("");
  const [cardColor, setCardColor] = useState("");
  // const cardReporter = user.email;
  const cardReporter = "";
  const [assignees, setAssignees] = useState([]);
  const cardDocumentGroup = useRef("");
  const [storageGroups, setStorageGroups] = useState([]);
  const { currentUserName, currentUserEmail } = useCurrentUserDetails();

  const { workspaceId, roomId } = useParams();

  const handleAddCard = () => {
    if (workspaceId && roomId && columnId) {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("columns")
        .doc(columnId)
        .collection("cards")
        .add({
          cardTitle: cardTitle.current.value,
          cardBody: cardBody.current.value,
          cardPriority: cardPriority.current.value,
          cardAssignee: cardAssignee.current.value,
          cardDeadline: cardDeadline.current.value,
          cardColor: cardColor,
          cardReporter: currentUserEmail,
          cardDocumentGroup: cardDocumentGroup.current.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log("Card added"))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("link")
      .collection("users")
      .onSnapshot((snapshot) =>
        setAssignees(
          snapshot.docs.map((doc) => ({
            userEmail: doc.data().userEmail,
          }))
        )
      );
  }, []);

  const getStorageGroups = () => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("storage")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setStorageGroups(snapshot.docs.map((doc) => doc.data()))
      );
  };

  useState(() => {
    getStorageGroups();
  }, []);

  return (
    <div
      className="modal modal-blur fade"
      id="modal-card"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New item</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">What needs to be done?</label>
              <input
                type="text"
                ref={cardTitle}
                className="form-control"
                name="example-text-input"
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Assignee</label>
                  <select className="form-select" ref={cardAssignee} required>
                    {assignees.map((assignee) => (
                      <option value={`${assignee.userEmail}`}>
                        {assignee.userEmail}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select className="form-select" ref={cardPriority}>
                    <option value="Normal" selected>
                      Normal
                    </option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div> */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    ref={cardDeadline}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Document group</label>
                  <select
                    className="form-select"
                    ref={cardDocumentGroup}
                    // value={groupToGetFiles}
                    // defaultValue={groupToGetFiles}
                    // onChange={e => {
                    //   getFiles(e.target.value);
                    //   setGroupToUpload(e.target.value);
                    // }}
                  >
                    {storageGroups.map((storageGroup, index) => (
                      <option value={storageGroup.groupName}>
                        {storageGroup.groupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Reporter</label>
                  <input
                    type="text"
                    // ref={cardDocumentGroup}
                    className="form-control"
                    placeholder={currentUserName}
                    disabled
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <div>
                    <label className="form-label">Tag color</label>
                    <div className="row g-2">
                      <div className="col-auto">
                        <label className="form-colorinput form-colorinput-light">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="white"
                            className="form-colorinput-input"
                            onChange={(e) => setCardColor(e.target.value)}
                            defaultChecked
                          />
                          <span className="form-colorinput-color bg-white" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="blue"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-blue" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="purple"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-purple" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="pink"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-pink" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="red"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-red" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="yellow"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-yellow" />
                        </label>
                      </div>
                      <div className="col-auto">
                        <label className="form-colorinput">
                          <input
                            name="color"
                            type="radio"
                            defaultValue="lime"
                            onChange={(e) => setCardColor(e.target.value)}
                            className="form-colorinput-input"
                          />
                          <span className="form-colorinput-color bg-lime" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    ref={cardDeadline}
                    className="form-control"
                  />
                </div>
              </div> */}

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select className="form-select" ref={cardPriority}>
                    <option value="Normal" selected>
                      Normal
                    </option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    ref={cardBody}
                    rows={3}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
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
              onClick={handleAddCard}
              data-bs-dismiss="modal"
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
              Create new item
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCardModal;
