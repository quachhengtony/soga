import React from 'react';
import './Login.css';
import { Button, Card, H3 } from '@blueprintjs/core';

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
                <H3 className="bp3-heading"><code>Soga</code></H3>
                <p className="bp3-ui-text">Your remote success</p>
                <Button text="Login with Google" icon="log-in" intent='success' className='nbr' onClick={login}  large />
            </Card>
        </div>
    );
}

export default Login;
