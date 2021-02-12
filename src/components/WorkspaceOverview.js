import "../styles/WorkspaceOverview.css";
import db from "../adapters/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams();
  const [workspaceDetails, setWorkspaceDetails] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then((doc) => setWorkspaceDetails(doc.data()))
      .catch((error) => console.log(error));
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("link")
      .collection("users")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(
          snapshot.docs.map((doc) => ({
            email: doc.data().userEmail,
          }))
        )
      );
  }, []);

  return (
    <div className="workspaceoverview">
      <div className="content">
        <div className="container-xl">
          {/* Page title */}
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Overview</h2>
                <div className="text-muted mt-1">People</div>
              </div>
              {/* Page title actions */}
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <input
                    type="search"
                    className="form-control d-inline-block w-9 me-3"
                    placeholder="Search user…"
                  />
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
                    New user
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cards">
            {workspaceUsers.map((workspaceUser, index) => (
                <div className="col-md-6 col-lg-3 --workspaceoverview-col-md-6" key={index}>
                <div className="card --workspaceoverview-card">
                  <div className="card-body p-4 text-center">
                    <span
                      className="avatar avatar-xl mb-3 avatar-rounded"
                      style={{
                        backgroundImage:
                          "url('https://www.pngrepo.com/download/26474/avatar.png')",
                      }}
                    />
                    <h3 className="m-0 mb-1">
                      <a href="javascript:void(0)">
                        {workspaceUser.email}
                      </a>
                    </h3>
                    <div className="text-muted">Software Engineer</div>
                    <div className="mt-3">
                      <span className="badge bg-purple-lt">Author</span>
                    </div>
                  </div>
                  <div className="d-flex --workspaceoverview-d-flex">
                    <a href="javascript:void(0)" className="card-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon me-2 text-muted"
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
                        <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                        <line x1="8" y1="9" x2="16" y2="9" />
                        <line x1="8" y1="13" x2="14" y2="13" />
                      </svg>
                      Chat
                    </a>
                    <a href="javascript:void(0)" className="card-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon me-2 text-muted"
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
                        <rect x={3} y={5} width={18} height={14} rx={2} />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
}
