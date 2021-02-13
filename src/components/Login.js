import { auth, provider } from "../adapters/firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Login() {
  const history = useHistory();
  const { signIn } = useStateValue();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigninIn] = useState(false);

  const handleSignIn = async e => {
    e.preventDefault();

    try {
      setIsSigninIn(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      history.push("/links");
      window.location.reload();
    } catch {
      setError("Failed to sign in.");
    }
    setIsSigninIn(false);
  }

  return (
    <div className="flex-fill d-flex flex-column justify-content-center py-4">
      <div className="container-tight py-6">
        <div className="text-center mb-4">
        {error && (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-title">I'm so sorry...</h4>
              <div className="text-muted">
                {error}
              </div>
            </div>
          )}
          {/* <a href=".">
            <img
              src="https://cdn.worldvectorlogo.com/logos/dropbox-3.svg"
              height={36}
              alt=""
            />
          </a> */}
          <a href="."><img src="https://cdn.worldvectorlogo.com/logos/dropbox-3.svg" height={36} alt="Thoka" /></a>
        </div>
        <form
          className="card card-md"
          autoComplete="off"
          onSubmit={handleSignIn}
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Sign in to your account
            </h2>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={emailRef}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="javascript:void(0)">I forgot password</a>
                </span>
              </label>
              <div className="input-group input-group-flat">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="off"
                  ref={passwordRef}
                />
                <span className="input-group-text">
                  <a
                    href="javascript:void(0)"
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
            <div className="mb-2">
              <label className="form-check">
                <input type="checkbox" className="form-check-input" checked/>
                <span className="form-check-label">
                  Remember me on this device
                </span>
              </label>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100" disabled={isSigningIn}>
                Login
              </button>
            </div>
          </div>
          <div className="hr-text">or</div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <button className="btn btn-white w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-google"
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
                    <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                  </svg>
                  Login with Google
                </button>
              </div>
              <div className="col">
                <a href="javascript:void(0)" className="btn btn-white w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-facebook"
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
                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                  </svg>
                  Login with Facebook
                </a>
              </div>
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          Don't have account yet?{" "}
          <a href="javascript:void(0)" tabIndex={-1}>
            <Link to="/signup">Sign up</Link>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
