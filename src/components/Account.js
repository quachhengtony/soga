import { Card, Button, H3, H5 } from '@blueprintjs/core';
import React from 'react';
import { useStateValue } from '../StateProvider';
import './Account.css';
import db from '../firebase';
import { useHistory } from 'react-router-dom';


function Account() {
    
    const [{user}] = useStateValue();
    const history = useHistory();

    const setPaidUser = () => {
        db.collection('paidUsers').doc(user.uid).set({
            name: user.displayName,
            email: user.email
        })
        // history.push('/console');
        window.location.reload();
    }

    return (
        <div className="account">
            <Card className="account_card" elevation={1}>
                <img src={user.photoURL} alt="Avatar" className="account_avatar"></img>
                <p>Your ID: {user.uid}</p>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Plan: Free</p>
                <Button text="Delete account" icon="delete" minimal outlined intent="danger" />
            </Card>
            <Card className='account_card_plans' elevatrion={1}>
                <H3>Plans</H3>
                <Card classname='account_card_plan'>
                    <H5>Free</H5>
                    <Button text='Current plan' minimal outlined disabled/>
                </Card>
                <Card classname='account_card_plan'>
                    <H5>$$$</H5>
                    <Button text='Choose plan' onClick={setPaidUser} minimal outlined intent='success' />
                </Card>
            </Card>
        </div>
    );
}
export default Account;