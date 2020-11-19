import React, { useState, useEffect } from 'react';
import CustomerIcon from '@atlaskit/icon/glyph/person';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import LanguageIcon from '@atlaskit/icon/glyph/world';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import RoadmapIcon from '@atlaskit/icon/glyph/roadmap';
import RoomMenuIcon from '@atlaskit/icon/glyph/room-menu';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import HomeIcon from '@atlaskit/icon/glyph/home';
import BoardIcon from '@atlaskit/icon/glyph/board';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import {
    ButtonItem,
    LinkItem,
    NavigationFooter,
    NavigationHeader,
    Header,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation,
  } from '@atlaskit/side-navigation';

import './Sidebar.css';
import db from '../firebase';
import { useHistory, useParams } from 'react-router-dom';
import SelectRoom from './SelectRoom';
import CreateRoom from './CreateRoom';
import { useStateValue } from '../StateProvider';

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

    const LanguageSettings = () => {
        return (
          <NestingItem
            iconBefore={<LanguageIcon label="" />}
            id="3-1"
            title="Language settings"
          >
            <Section>
              <ButtonItem>Customize</ButtonItem>
      
              <NestingItem id="3-1-1" title="German Settings">
                <Section>
                  <ButtonItem>Hallo Welt!</ButtonItem>
                </Section>
              </NestingItem>
              <NestingItem id="3-1-2" title="English Settings">
                <Section>
                  <ButtonItem>Hello World!</ButtonItem>
                </Section>
              </NestingItem>
            </Section>
          </NestingItem>
        );
      };

    return (
        <div className="sidebar">
                <div className='wpBar'>
                    <div className='wpBar_button' onClick={push.bind(this, '/console')}>
                        <HomeIcon label='Home icon' size="medium" primaryColor='#ffffff' />
                    </div>
                    <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/room/undefined`)}>
                        <RoomMenuIcon label='Rooms icon' size="medium" primaryColor='#ffffff' />
                    </div>
                    <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/timeline`)}>
                        <RoadmapIcon label='Roadmap icon' size="medium" primaryColor='#ffffff' />
                    </div>
                    <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/reports`)}>
                        <DocumentsIcon label='Reports icon' size="medium" primaryColor='#ffffff' />
                    </div>
                    <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/settings`)}>
                        <SettingsIcon label='Settings icon' size="medium" primaryColor='#ffffff' />
                    </div>
                </div>
                <SideNavigation className='rBar'>
                <NavigationHeader>
                <Header
                iconBefore={<FolderIcon />}
                description="Next-gen software"
                >
                {workspaceName}
                </Header>
            </NavigationHeader>
                <NestableNavigationContent>
                    <Section title='Rooms'>
                        {rooms.map((room, index) => (
                            <SelectRoom text={room.name} id={room.id} key={index} />
                        ))}
                        <CreateRoom />
                        <ButtonItem onClick={push.bind(this, `board`)} iconBefore={<BoardIcon/>}>Board</ButtonItem>
                        <ButtonItem onClick={push.bind(this, `schedule`)} iconBefore={<CalendarIcon />}>Schedule</ButtonItem>
                    </Section>
                    <Section title='People'>
                        <ButtonItem iconBefore={<CustomerIcon />}>{user?.displayName}</ButtonItem>
                        <NestingItem
                        id="1"
                        iconBefore={<PeopleGroupIcon label="" />}
                        title="Teams"
                        >
                        <Section>
                            <ButtonItem>Jack</ButtonItem>
                        </Section>
                        </NestingItem>
                    </Section>
                </NestableNavigationContent>
      </SideNavigation>
        </div>
    );
}

export default Sidebar;
