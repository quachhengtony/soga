import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../styles/Inbox.css";
import db from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function Inbox() {
  const [myWorkspaces, setMyWorkspaces] = useState([]);
  const [linkWorkspaces, setLinkWorkspaces] = useState([]);
  const { user } = useStateValue();
  const history = useHistory();
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
  } = useCurrentUserDetails();

  const handleDeleteWorkspaceFromUser = async (workspaceId) => {
    await db
      .collection("users")
      .doc(currentUserEmail)
      .collection("workspaces")
      .doc(workspaceId)
      .delete();
  };

  useEffect(() => {
    if (currentUserEmail) {
      db.collection("users")
        .doc(currentUserEmail)
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
                <h2 className="page-title">Links</h2>
                <div className="text-muted mt-1">Workspace you are linked to</div>
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
                  {/* <a href="javascript:void(0)" className="btn btn-primary">
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
          <div className="row row-cards">
            {linkWorkspaces.map((linkWorkspace, index) => (
              <div className="col-lg-6" key={index}>
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3">
                        <img
                          src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Docker-Logo-White-RGB_Moby.png?itok=VwIPWvAs"
                          alt="Workspace"
                          className="rounded"
                        />
                      </div>
                      <div className="col">
                        <h3 className="card-title mb-1">
                          <a
                            href="javascript:void(0)"
                            className="text-reset"
                            onClick={() =>
                              history.push(
                                `/workspace/${linkWorkspace.workspaceId}/overview`
                              )
                            }
                          >
                            {linkWorkspace.workspaceName}
                          </a>
                        </h3>
                        <div className="text-muted">
                          {linkWorkspace.authorName}
                        </div>
                        <div className="mt-3">
                          <div className="row g-2 align-items-center">
                            <div className="col-auto">25%</div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div
                                  className="progress-bar"
                                  style={{ width: "25%" }}
                                  role="progressbar"
                                  aria-valuenow={25}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                >
                                  <span className="visually-hidden">
                                    25% Complete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="dropdown">
                          <a
                            href="#"
                            className="card-dropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={19} r={1} />
                              <circle cx={12} cy={5} r={1} />
                            </svg>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href="javascript:void(0)" className="dropdown-item" onClick={() => handleDeleteWorkspaceFromUser(linkWorkspace.workspaceId)}>
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* {linkWorkspaces.map((linkWorkspace, index) => (
            <div key={index}>
              <a
                href="javascript:void(0)"
                onClick={() =>
                  history.push(
                    `/workspace/${linkWorkspace.workspaceId}/overview`
                  )
                }
              >
                {linkWorkspace.workspaceName}
              </a>{" "}
              |{" "}
              <a
                href="javascript:void(0)"
                onClick={() =>
                  handleDeleteWorkspaceFromUser(linkWorkspace.workspaceId)
                }
              >
                Delete
              </a>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
