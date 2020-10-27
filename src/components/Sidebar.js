import React from 'react';
import { 
    Button, 
    Icon, 
    Menu, 
    MenuItem, 
    MenuDivider, 
    Card,
    Popover
} from '@blueprintjs/core';
import './Sidebar.css';

const exampleMenu = (
    <Menu>
        <MenuItem icon="graph" text="Graph" />
        <MenuItem icon="map" text="Map" />
        <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
        <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
        <MenuDivider />
        <MenuItem icon="cog" text="Settings...">
            <MenuItem icon="add" text="Add new application" disabled={true} />
            <MenuItem icon="remove" text="Remove application" />
        </MenuItem>
    </Menu>
);

function Sidebar() {
    return (
        <div className="sidebar">
                <Card className="sidebar_card left">
                    <Icon icon="mountain" iconSize={40} />
                    <div>
                        <Button icon="search" minimal fill large />
                    </div>
                    <div>
                        <Button icon="plus" minimal fill large />
                    </div>
                </Card>
                <Card className="sidebar_card right">
                    <div>
                        <h2 className="bp3-heading">Smart Labs</h2>
                        <Popover content={exampleMenu}>
                            <Button icon="chevron-down" minimal />
                        </Popover>
                    </div>
                    <Button text="Channels" icon="plus" minimal outlined />
                    <Menu>
                        <MenuItem text="# General" />
                        <MenuItem text="# Random" />
                        <MenuItem text="# Marketing" />
                        <MenuItem text="# Product" />
                    </Menu>
                    <div></div>
                    <Button text="People" icon="new-person" minimal outlined />
                    <Menu>
                        <MenuItem text="Tony Quach" />
                    </Menu>
                </Card>
        </div>
    );
}

export default Sidebar;
