import React from 'react';
import './Login.css';
import { Button, Card } from '@blueprintjs/core';
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
            <Card>
                <Button text="Login with Google" icon="login" onClick={login} minimal outlined large />
            </Card>
        </div>
    );
}

export default Login;
