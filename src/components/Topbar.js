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
    const history = useHistory();
    const [{user}] = useStateValue();

    const goToHome = () => {
        history.push('/home');
    }

    const goToJobs = () => {
        history.push('/jobs');
    }

    const goToAccount = () => {
        history.push('/account');
    }

    return (
        <div className="navbar">
            <Navbar className="navbar_container">
                <NavbarGroup align="left">
    <NavbarHeading className="navbar_heading"><code>Soga</code></NavbarHeading>
                    <NavbarDivider />
                    <Button className="navbar_button" onClick={goToHome} text='Home' minimal />
                    <Button className="navbar_button" text='Why Soga?' minimal />
                    <Button className="navbar_button" text='Solutions' minimal />
                    <Button className="navbar_button" text='Support' minimal />
                    <Button className="navbar_button" text='Company' minimal />
                    <Button className="navbar_button" text="Find a Remote Job" icon='search-template' minimal />
                    <Button className="navbar_button" text='My Manager' icon='helper-management' minimal />
                </NavbarGroup>
                <NavbarGroup align="right">
                        <Button className="navbar_button" onClick={goToAccount} text="Account" icon="user" minimal />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

function TopbarForPaidUser() {
    const history = useHistory();

    const goToHome = () => {
        history.push('/home');
    }

    const goToJobs = () => {
        history.push('/jobs');
    }

    const goToConsole = () => {
        history.push('/console');
    }

    const goToAccount = () => {
        history.push('/account');
    }

    return (
        <div className="navbar">
            <Navbar className="navbar_container">
                <NavbarGroup align="left">
    <NavbarHeading className="navbar_heading"><code>Soga</code></NavbarHeading>
                    <NavbarDivider />
                    <Button className="navbar_button" onClick={goToHome} text='Home' minimal />
                    <Button className="navbar_button" text='Why Soga?' minimal />
                    <Button className="navbar_button" text='Solutions' minimal />
                    <Button className="navbar_button" text='Support' minimal />
                    <Button className="navbar_button" text='Company' minimal />
                    <Button className="navbar_button" text="Find a Remote Job" icon='search-template' minimal />
                   <Button className="navbar_button" onClick={goToConsole} text='Console' icon='control' minimal />
                </NavbarGroup>
                <NavbarGroup align="right">
                        <Button className="navbar_button" onClick={goToAccount} text="Account" icon="user" minimal />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

export { Topbar, TopbarForPaidUser };
