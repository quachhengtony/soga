import React from 'react';
import './Navbar.css';
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button
} from '@blueprintjs/core';

function Navbarr() {
    return (
        <div className="navbar">
            <Navbar>
                <NavbarGroup>
                    <NavbarHeading>Soga.io</NavbarHeading>
                    <NavbarDivider />
                    <Button text='Home' icon='home' minimal />
                    <Button text='Console' icon='console' minimal />
                </NavbarGroup>
            </Navbar>
        </div>
    );
}

export default Navbarr;
