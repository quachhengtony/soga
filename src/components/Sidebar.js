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

    const goToHome = () => {
        history.push('/console');
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
                        <Button onClick={goToHome} minimal fill large>
                            <Icon icon='clean' iconSize='30' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        {/* helper-management th-derived timeline-events*/}
                        {/* <Button icon="th-derived" minimal fill large /> */}
                        <Button minimal fill large>
                            <Icon icon='th-derived' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        {/* <Button icon="doughnut-chart" minimal fill large /> */}
                        <Button minimal fill large>
                            <Icon icon='doughnut-chart' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        {/* <Button icon="timeline-line-chart" minimal fill large /> */}
                        <Button minimal fill large>
                            <Icon icon='timeline-line-chart' iconSize='18' color='#ffffff' />
                        </Button>
                    </div>
                    <div>
                        {/* <Button icon="cog" minimal fill large /> */}
                        <Button minimal fill large>
                            <Icon icon='cog' iconSize='18' color='#ffffff' />
                        </Button>
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
