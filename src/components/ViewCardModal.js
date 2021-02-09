import { useState, useEffect } from "react";
import "../styles/ViewCardModal.css";
import db from "../adapters/firebase";
import { useParams } from "react-router-dom";

function ViewCardModal(props) {
  const { workspaceId, roomId } = useParams();

  // useEffect(() => {
  //   db.collection("workspaces")
  //     .doc(workspaceId)
  //     .collection("rooms")
  //     .doc(roomId)
  //     .collection("columns")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) =>
  //       setColumns(snapshot.docs.map((doc) => doc.data()))
  //     );
  // }, []);

  return (
    <div
      className="modal modal-blur fade --viewcardmodal-modal"
      id="modal-card-details"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-full-width modal-dialog-centered --viewcardmodal-modal-dialog"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body --viewcardmodal-modal-body">
            <div className="modal-body-left">
              <h3>{props.cardTitle}</h3>
              <label for="card-description">Description:</label>
              <div id="card-description" className="text-muted">
                {props.cardBody}
              </div>
            </div>
            <div className="modal-body-right">
              <div>
                <h4>
                  Assignee:{" "}
                  <span className="text-muted">{props.cardAssignee}</span>
                </h4>
              </div>
              <div>
                <h4>
                  Status:{" "}
                  <span className="text-muted">
                    {props.columns.map((column) => (
                      <a href="javascript:void(0)" onClick={() => props.handleChangeCardStatus(column.id)}>| {column.name} </a>
                    ))}
                  </span>
                </h4>
              </div>
              <div>
                <h4>
                  Deadline:{" "}
                  <span className="text-muted">{props.cardDeadline}</span>
                </h4>
              </div>
              <div>
                <h4>
                  Priority:{" "}
                  <span className="text-muted">{props.cardPriority}</span>
                </h4>
              </div>
              <div>
                <h4>
                  Reporter:{" "}
                  <span className="text-muted">{props.cardReporter}</span>
                </h4>
              </div>
              <div>
                <h4>
                  Document group:{" "}
                  <span className="text-muted">{props.cardDocumentGroup}</span>
                </h4>
              </div>
            </div>
          </div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn me-auto"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>

    // <div
    //   className="modal modal-blur fade --viewcardmodal-modal"
    //   id="modal-card-details"
    //   role="dialog"
    //   aria-hidden="true"
    // >
    //   <div
    //     className="modal-dialog modal-lg modal-dialog-centered --listcard-modal-dialog"
    //     role="document"
    //   >
    //     <div className="modal-content">
    //       <button
    //         type="button"
    //         className="btn-close"
    //         data-bs-dismiss="modal"
    //         aria-label="Close"
    //       />
    //       <div className="modal-body text-left py-4 --flex-modal-body">
    //         <div className="modal-body-left">
    //           <h3>{props.cardTitle}</h3>
    //           <label for="card-description">Description:</label>
    //           <div id="card-description" className="text-muted">
    //           {props.cardBody}
    //           </div>
    //         </div>
    //         <div className="modal-body-right">
    //           <div>
    //             <h4>
    //               Assignee: <span className="text-muted">{props.cardAssignee}</span>
    //             </h4>
    //           </div>
    //           <div>
    //             <h4>
    //               Status: <span className="text-muted"></span>
    //             </h4>
    //           </div>
    //           <div>
    //             <h4>
    //               Deadline: <span className="text-muted">{props.cardDeadline}</span>
    //             </h4>
    //           </div>
    //           <div>
    //             <h4>
    //               Priority: <span className="text-muted">{props.cardPriority}</span>
    //             </h4>
    //           </div>
    //           <div>
    //             <h4>
    //               Reporter: <span className="text-muted">{props.cardReporter}</span>
    //             </h4>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ViewCardModal;
