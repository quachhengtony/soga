import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../styles/Inbox.css";
import db from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";

function Inbox() {
  const [myWorkspaces, setMyWorkspaces] = useState([]);
  const [linkWorkspaces, setLinkWorkspaces] = useState([]);
  const { user } = useStateValue();
  const history = useHistory();

  const handleDeleteWorkspaceFromUser = async (workspaceId) => {
    await db.collection("users")
    .doc(user.email)
    .collection("workspaces")
    .doc(workspaceId)
    .delete()
  }

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.email)
        .collection("workspaces")
        .onSnapshot((snapshot) =>
          setLinkWorkspaces(snapshot.docs.map((doc) => doc.data()))
        );
    }
  });

  return (
    <div className="inbox">
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Workspaces</h2>
                <div className="text-muted mt-1">x of n workspaces</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <div className="me-3 d-none d-md-block">
                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search…"
                      />
                      <span className="input-icon-addon">
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
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* <a href="#" className="btn btn-primary">
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
                    Add photo
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container-xl --inbox-container-xl">
          {linkWorkspaces.map((linkWorkspace, index) => (
            <div key={index}>
              <a href="javascript:void(0)" onClick={() => history.push(`/workspace/${linkWorkspace.workspaceId}/room/undefined/chat`)}>{linkWorkspace.workspaceId}</a> | <a href="javascript:void(0)" onClick={() => handleDeleteWorkspaceFromUser(linkWorkspace.workspaceId)}>Delete</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
