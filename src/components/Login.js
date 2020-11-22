import Button from '@atlaskit/button';
import GsuiteIcon from '@atlaskit/icon/glyph/gsuite';

import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory();
    const [state, dispatch] = useStateValue();
    
    const login = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
        history.push("/account");
    };

    return (
        <div className="login">
            <div className="login_header">
                <h2><code>Soga</code></h2>
                <p className="bp3-ui-text">Your remote success</p>
            </div>
            <div className="login_body">
                <div>
                    <Button appearance="primary" iconBefore={<GsuiteIcon />} shouldFitContainer onClick={login}>Sign In with Google</Button>
                </div>
                <div>
                    <Button shouldFitContainer>Sign In with Email</Button>
                </div>
                    Doesn't have an account yet?<Button appearance="link" onClick={login}>Sign Up</Button>
            </div>
        </div>
    );
}

export default Login;
