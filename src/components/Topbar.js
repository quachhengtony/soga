import { useHistory } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import db from "../adapters/firebase";
import "../styles/Topbar.css";
import { useState, useEffect } from "react";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function Topbar() {
  const history = useHistory();

  return (
    <div className="topbar --public">
      <header className="navbar navbar-expand-md navbar-light d-print-none --topbar-navbar">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"> */}
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href="javascript:void(0)">
              <img
                src="https://cdn.worldvectorlogo.com/logos/dropbox-3.svg"
                width={110}
                height={32}
                alt="Thoka"
                className="navbar-brand-image"
              />
            </a>
          </div>
          {/* </h1> */}
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Product</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Learn</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Pricing</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Contact</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="navbar-nav flex-row order-md-last">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/signin")}
                  >
                    <span className="nav-link-title">Sign in</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/signup")}
                  >
                    <span className="nav-link-title">Sign up</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function PrivateTopbar() {
  const history = useHistory();
  const { user, signOut } = useStateValue();
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { currentUserName, currentUserRole } = useCurrentUserDetails();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      history.push("/signin");
      window.location.reload();
    } catch {
      setError("Failed to sign out!");
    }
    setIsSigningOut(false);
  };

  useEffect(() => {
    let myNavItems = document.querySelectorAll(".nav-item");
    myNavItems.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        myNavItems.forEach((navItem) => navItem.classList.remove("active"));
        navItem.classList.add("active");
      });
    });
  }, []);

  return (
    <div className="topbar">
      <header className="navbar navbar-expand-md navbar-light d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"> */}
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src="https://cdn.worldvectorlogo.com/logos/dropbox-3.svg"
                width={110}
                height={32}
                alt="Thoka"
                className="navbar-brand-image"
              />
            </a>
          </div>
          {/* </h1> */}
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <a
                href="#"
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex={-1}
                aria-label="Show notifications"
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
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span className="badge bg-red" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus ad amet consectetur exercitationem fugiat in ipsa
                    ipsum, natus odio quidem quod repudiandae sapiente. Amet
                    debitis et magni maxime necessitatibus ullam.
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{
                    backgroundImage:
                      'url("https://www.pngrepo.com/download/26474/avatar.png")',
                  }}
                />
                <div className="d-none d-xl-block ps-2">
                  <div>{currentUserName ? currentUserName : "..."}</div>
                  <div className="mt-1 small text-muted">
                    {currentUserRole ? currentUserRole : "..."}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a className="dropdown-item">Set status</a>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/profile-account")}
                >
                  Profile & account
                </a>
                <a className="dropdown-item">Billing</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">Settings</a>
                <a onClick={handleSignOut} className="dropdown-item">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar navbar-light">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li
                  className="nav-item"
                  onClick={() => history.push("/b/dashboard")}
                >
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dashboard"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="13" r="2" />
                        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                        <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Dashboard</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/links")}
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-link"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Links</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/activities")}
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-activity"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12h4l3 8l4 -16l3 8h4" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Activities</span>
                  </a>
                </li>
              </ul>
              <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                {/* <form action="." method="get">
                  <div className="input-icon">
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search…"
                      aria-label="Search in website"
                    />
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Topbar, PrivateTopbar };
