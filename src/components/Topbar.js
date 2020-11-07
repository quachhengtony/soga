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

function Topbar() {
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
                    <Button className="navbar_button" onClick={goToHome} text='Home' icon='home' minimal />
                    <Button className="navbar_button" onClick={goToJobs} text="Jobs" icon='th-list' minimal />
                    <Button className="navbar_button" onClick={goToConsole} text='Console' icon='console' minimal />
                </NavbarGroup>
                <NavbarGroup align="right">
                        <Button className="navbar_button" onClick={goToAccount} text="Account" icon="user" minimal />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

export default Topbar;
