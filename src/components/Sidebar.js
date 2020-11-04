import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Icon, 
    Menu, 
    MenuItem, 
    MenuDivider, 
    Card,
    Popover,
} from '@blueprintjs/core';

import './Sidebar.css';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import SelectRoom from './SelectRoom';
import CreateRoom from './CreateRoom';
import { useStateValue } from '../StateProvider';

const popupMenu = (
    <Menu>
        <MenuItem icon="link" text="Invite people to your workspace" />
        <MenuItem icon="new-layer" text="Create a room" />
        <MenuDivider/>
        <MenuItem icon="control" text="Preferences" />
        <MenuItem icon="settings" text="Settings & Administration" />
        <MenuDivider />
        <MenuItem icon="timeline-line-chart" text="Analytics" />
        <MenuDivider />
        <MenuItem icon="log-out" text="Sign out of workspace" />
        {/* <MenuItem icon="cog" text="Settings...">
            <MenuItem icon="add" text="Add new application" disabled={true} />
            <MenuItem icon="remove" text="Remove application" />
        </MenuItem> */}
    </Menu>
);

function Sidebar() {

    const { workspaceId } = useParams();

    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        db.collection('workspaces').doc(workspaceId).collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            })))
        ))
    }, [])
    
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
                <Card className="sidebar_card right" elevation={1}>
                    <div>
                        <h2 className="bp3-heading">Smart Labs</h2>
                        <Popover content={popupMenu}>
                            <Button icon="menu" minimal />
                        </Popover>
                    </div>
                    <CreateRoom />
                    <Menu>
                        {rooms.map(room => (
                            <SelectRoom text={room.name} id={room.id} />
                        ))}
                    </Menu>
                    <div></div>
                    <div className="people">
                        <Button text="People" icon="new-person" minimal outlined />
                        <Button icon="caret-down" minimal />
                    </div>
                    <Menu>
                        {user ? (
                            <MenuItem text={user.displayName} />
                        ) : (
                            console.log("No user")
                        )}
                    </Menu>
                </Card>
        </div>
    );
}

export default Sidebar;
