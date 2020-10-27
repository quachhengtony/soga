import React, { useState, useEffect } from 'react';
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

import db from '../firebase';
import { useParams } from 'react-router-dom';
import SelectRoom from './SelectRoom';
import CreateRoom from './CreateRoom';

const popupMenu = (
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

    const { workspaceId } = useParams();

    // Init rooms with an empty array (arrays of room) || Assume rooms is empty 
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Go into db => collection and take a snapshot of the collection (realtime)
        db.collection('workspaces').doc(workspaceId).collection('rooms').onSnapshot(snapshot => (
            // Go to the snaphot => doc and map (Loop through every single doc)
            // And for every doc do...
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
                <Card className="sidebar_card right">
                    <div>
                        <h2 className="bp3-heading">Smart Labs</h2>
                        <Popover content={popupMenu}>
                            <Button icon="chevron-down" minimal />
                        </Popover>
                    </div>
                    <CreateRoom />
                    <Menu>
                        {rooms.map(room => (
                            <SelectRoom text={room.name} id={room.id} />
                        ))}
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
