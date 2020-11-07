import React from 'react';
import './Login.css';
import { Button, Card, Divider} from '@blueprintjs/core';

import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {

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
    };

    return (
        <div className="login">
            <Card className="login_card" elevation={1}>
                <h5 className="bp3-heading">Soga.io</h5>
                <p className="bp3-ui-text">Lorem ipsum dolor sit amet</p>
                <Button text="Login with Google" icon="log-in" onClick={login} minimal outlined large />
            </Card>
        </div>
    );
}

export default Login;
