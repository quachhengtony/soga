import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../firebase";
import "./CreateCard.css";

function CreateCard({ columnId }) {
  const { workspaceId, roomId } = useParams();

  const handleAddCard = () => {
    const cardContent = prompt("Enter card content:");
    if (workspaceId && roomId && cardContent != "") {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("columns")
        .doc(columnId)
        .collection("cards")
        .add({
          body: cardContent,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log("Card added"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <button
        className="btn btn-sm --create-card-btn"
        data-bs-toggle="modal"
        data-bs-target="#modal-report"
      >
        New card
      </button>

      <div
        className="modal modal-blur fade"
        id="modal-report"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New card</h5>
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
                  className="form-control"
                  name="example-text-input"
                />
              </div>
              {/* <label className="form-label">Report type</label>
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
                          Provide only basic data needed for the report
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
                          Insert charts and additional advanced analyses to be
                          inserted in the report
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
              </div> */}
              <div className="row">
                <div className="col-lg-8">
                  <div className="mb-3">
                    <label className="form-label">Assignee</label>
                    <select className="form-select">
                      <option value={1} selected>
                        Quach Heng Tony
                      </option>
                      <option value={2}>Tony Quach</option>
                      <option value={3}>Ryan Dahl</option>
                    </select>
                    {/* <label className="form-label">Report url</label>
                    <div className="input-group input-group-flat">
                      <span className="input-group-text">
                        https://tabler.io/reports/
                      </span>
                      <input
                        type="text"
                        className="form-control ps-0"
                        defaultValue="report-01"
                        autoComplete="off"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                      <option value={1} selected>
                        Normal
                      </option>
                      <option value={2}>High</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <div>
                      <label className="form-label">Choose a color</label>
                      <div className="row g-2">
                        <div className="col-auto">
                          <label className="form-colorinput form-colorinput-light">
                            <input
                              name="color"
                              type="radio"
                              defaultValue="white"
                              className="form-colorinput-input"
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
                              className="form-colorinput-input"
                            />
                            <span className="form-colorinput-color bg-lime" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Deadline</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
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
                href="#"
                className="btn btn-primary ms-auto"
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
                Create new card
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCard;
