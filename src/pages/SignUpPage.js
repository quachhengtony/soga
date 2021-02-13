import db, { auth, provider } from "../adapters/firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Footer from "../components/Footer";
import "../styles/SignUpPage.css";
import { v4 as uuidv4 } from "uuid";

function SignUpPage() {
  const history = useHistory();
  const { signUp, currentDate } = useStateValue();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const nameRef = useRef("");
  const roleRef = useRef("");
  const businessNameRef = useRef("");

  const [error, setError] = useState("");
  const [isSigningUp, setIsSigninUp] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setIsSigninUp(true);
      await db.collection("users").doc(emailRef.current.value).set({
        userName: nameRef.current.value,
        userRole: roleRef.current.value,
        userBusinessName: businessNameRef.current.value,
        userEmail: emailRef.current.value,
        userUUId: uuidv4(),
        createdAt: currentDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/links");
      window.location.reload();
    } catch {
      setError("Failed to create account.");
    }

    setIsSigninUp(false);
  };

  return (
    <div className="signuppage">
      <div className="flex-fill d-flex flex-column justify-content-center py-4">
        <div className="container-tight py-6">
          <div className="text-center mb-4">
            {error && (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-title">I'm so sorry...</h4>
                <div className="text-muted">{error}</div>
              </div>
            )}
            <a href=".">
              <img
                src="https://cdn.worldvectorlogo.com/logos/dropbox-3.svg"
                height={36}
                alt="Thoka"
              />
            </a>
          </div>
          <form className="card card-md" onSubmit={handleSignUp}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Create new account
              </h2>
              {/* <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter name" />
          </div> */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  ref={nameRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role"
                  ref={roleRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Business, organization, team
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Business, organization, team"
                  ref={businessNameRef}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="off"
                    ref={passwordRef}
                    required
                  />
                  <span className="input-group-text">
                    <a
                      href="#"
                      className="link-secondary"
                      title="Show password"
                      data-bs-toggle="tooltip"
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
                        <circle cx={12} cy={12} r={2} />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    ref={passwordConfirmRef}
                    required
                  />
                  <span className="input-group-text">
                    <a
                      href="#"
                      className="link-secondary"
                      title="Show password"
                      data-bs-toggle="tooltip"
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
                        <circle cx={12} cy={12} r={2} />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input" checked />
                  <span className="form-check-label">
                    Agree the{" "}
                    <a href="javascript:void(0)" tabIndex={-1}>
                      terms and policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSigningUp}
                >
                  Create new account
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Already have account?{" "}
            <a href="javascript:void(0)" tabIndex={-1}>
              <Link to="/signin">Sign in</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
