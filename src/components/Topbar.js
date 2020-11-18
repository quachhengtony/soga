import React from 'react';
import './Topbar.css';
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button
} from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

function Topbar() {
    const [{user}] = useStateValue();
    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    return (
        <div className="navbar">
            <Navbar className="navbar_container">
                <NavbarGroup align="left">
                    <NavbarHeading className="navbar_heading"><code>SOGA</code></NavbarHeading>
                    <NavbarDivider />
                    <Button className="navbar_button" onClick={push.bind(this, '/home')} text='Home' minimal />
                    <Button className="navbar_button" text='Why Soga?' minimal />
                    <Button className="navbar_button" text='Solutions' minimal />
                    <Button className="navbar_button" text='Support' minimal />
                    <Button className="navbar_button" text='Company' minimal />
                    <Button className="navbar_button" text="Find a Remote Job" icon='search-template' intent='primary' minimal />
                    <Button className="navbar_button" text="Profile" icon='user' intent='primary' minimal />
                    <Button className="navbar_button" text='Manage' icon='helper-management' intent='primary' minimal />
                </NavbarGroup>
                <NavbarGroup align="right">
                        <Button className="navbar_button" onClick={push.bind(this, '/account')} text="Account" icon="user" minimal intent='primary' />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

function TopbarForPaidUser() {
    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    return (
        <div className="navbar">
            <Navbar className="navbar_container">
                <NavbarGroup align="left">
    <NavbarHeading className="navbar_heading"><code>Soga</code></NavbarHeading>
                    <NavbarDivider />
                    <Button className="navbar_button" onClick={push.bind(this, '/home')} text='Home' minimal />
                    <Button className="navbar_button" text='Why Soga?' minimal />
                    <Button className="navbar_button" text='Solutions' minimal />
                    <Button className="navbar_button" text='Support' minimal />
                    <Button className="navbar_button" text='Company' minimal />
                    <Button className="navbar_button" text="Find a Remote Jobs" icon='search-template' intent='primary' minimal />
                    <Button className="navbar_button" text="Hiring" icon='people' intent='primary' minimal />
                   <Button className="navbar_button" onClick={push.bind(this, '/console')}text='Manage' icon='helper-management' intent='primary' minimal />
                </NavbarGroup>
                <NavbarGroup align="right">
                        <Button className="navbar_button" onClick={push.bind(this, '/account')} text="Account" icon="user" intent='primary' minimal />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

export { Topbar, TopbarForPaidUser };
