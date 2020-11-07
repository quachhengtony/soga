import { Card, Button } from '@blueprintjs/core';
import React from 'react';
import { useStateValue } from '../StateProvider';
import './Account.css';

function Account() {
    
    const [{user}] = useStateValue();

    return (
        <div className="account">
            <Card className="account_card" elevation={1}>
                <img src={user.photoURL} alt="Avatar" className="account_avatar"></img>
                <p>Your ID: {user.uid}</p>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>

                <Button text="Delete account" icon="delete" minimal outlined intent="danger" />
            </Card>
        </div>
    );
}
export default Account;