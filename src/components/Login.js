import Button from "@atlaskit/button";
import GsuiteIcon from "@atlaskit/icon/glyph/gsuite";
import firebase from "firebase";

import "./Login.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  // const login = useCallback(() => {
  //     auth
  //         .signInWithPopup(provider)
  //         .then((result) => {
  //             console.log(result);
  //             dispatch({
  //                 type: actionTypes.SET_USER,
  //                 user: result.user,
  //             });
  //         })
  //         .catch((error) => {
  //             alert(error.message);
  //         });
  //     history.push("/account");
  // }, [])

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        history.push("/account");
      })
      .catch(err => console.log(err));
  };

  // const login = useCallback(
  //     async event => {
  //         event.preventDefault();
  //         try {
  //             await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  //             await auth
  //                 .signInWithPopup(provider)
  //                 .then((result) => {
  //                     console.log(result);
  //                     dispatch({
  //                         type: actionTypes.SET_USER,
  //                         user: result.user,
  //                     });
  //                 })
  //                 .catch((error) => {
  //                     alert(error.message);
  //                 });
  //             history.push("/account");
  //         } catch (error) {
  //             alert(error);
  //         }
  //     },
  //     [history]
  // );

  // const login = () => {
  //     auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(function() {
  //         return auth.signInWithPopup(provider)
  //                 .then((result) => {
  //                     console.log(result);
  //                     dispatch({
  //                         type: actionTypes.SET_USER,
  //                         user: result.user,
  //                     });
  //                     history.push('/account');
  //                 })
  //                 .catch((error) => {
  //                     alert(error.message);
  //                 });
  //     })
  //     .catch(function(error) {
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //     });
  // }

  return (
    <div className="login">
      <div className="login__div">
        <div>
          <p className="login__p --header">Soga</p>
          <p className="login__p">Lorem ipsum dolor sit amet</p>
        </div>
        <div>
          <Button
            appearance="primary"
            iconBefore={<GsuiteIcon />}
            shouldFitContainer
            onClick={login}
          >
            Sign in with Google
          </Button>
        </div>
        <div>
          <Button shouldFitContainer>Sign in with email</Button>
        </div>
        Don't have an account yet?
        <Button appearance="subtle-link" onClick={login}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Login;