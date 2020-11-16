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
import { useHistory, useParams } from 'react-router-dom';
import SelectRoom from './SelectRoom';
import CreateRoom from './CreateRoom';
import { useStateValue } from '../StateProvider';

const popupMenu = (
    <Menu>
        <MenuItem icon="link" text="Invite people to your workspace" />
        <MenuItem icon="new-layer" text="Create a room" />
        <MenuDivider/>
        <MenuItem icon="search-template" text="Search message" />
        <MenuItem icon="inbox-search" text="File browser" />
        <MenuDivider/>
        <MenuItem icon="timeline-line-chart" text="Analytics" />
        <MenuItem icon="settings" text="Settings & Administration" />
        <MenuDivider />
        <MenuItem icon="log-out" text="Sign out of workspace" />
    </Menu>
);

function Sidebar() {

    const { workspaceId } = useParams();

    const [workspaceName, setWorkspaceName] = useState("");
    const [rooms, setRooms] = useState([]);

    const [{ user }] = useStateValue();

    const history = useHistory();

    const push = (destination) => {
        history.push(destination);
    }

    useEffect(() => {
        db.collection('workspaces').doc(workspaceId).get().then(function(doc) {
            setWorkspaceName(doc.data().name)
        })
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
                    <div>
                        <Button onClick={push.bind(this, '/console')} minimal fill large>
                            <Icon icon='clean' iconSize='30' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={push.bind(this, `/workspace/${workspaceId}/room/undefined`)} minimal fill large>
                            <Icon icon='layers' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={push.bind(this, `/workspace/${workspaceId}/roadmap`)} minimal fill large>
                            <Icon icon='gantt-chart' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={push.bind(this, `/workspace/${workspaceId}/report`)} minimal fill large>
                            <Icon icon='doughnut-chart' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={push.bind(this, `/workspace/${workspaceId}/analytics`)} minimal fill large>
                            <Icon icon='timeline-line-chart' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={push.bind(this, `/workspace/${workspaceId}/settings`)} minimal fill large>
                            <Icon icon='cog' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div className='account'>
                        <img src={user.photoURL} alt="Avatar" className="account_avatar"></img>
                    </div>
                </Card>
                <Card className="sidebar_card right" elevation={1}>
                    <div>
                        <h2 className="bp3-heading">{workspaceName}</h2>
                        <Popover content={popupMenu}>
                            <Button icon="menu" minimal />
                        </Popover>
                    </div>
                    <CreateRoom />
                    <Menu className="menu">
                        {rooms.map((room, index) => (
                            <SelectRoom text={room.name} id={room.id} key={index} />
                        ))}
                    </Menu>
                    <div></div>
                    <div className="people">
                        <Button text="People" icon="new-person" className='nbr' intent='primary' minimal outlined />
                        <Button icon="caret-down" minimal />
                    </div>
                    <Menu className="menu">
                        {user ? (
                            <MenuItem text={user.displayName} style={{backgroundColor: '#fafbfc'}} />
                        ) : (
                            console.log("No user")
                        )}
                    </Menu>
                </Card>
        </div>
    );
}

export default Sidebar;
