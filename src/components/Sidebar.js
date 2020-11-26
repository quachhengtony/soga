import { useState, useEffect } from 'react';
import {
    ButtonItem,
    NavigationHeader,
    Header,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation,
} from '@atlaskit/side-navigation';
import CustomerIcon from '@atlaskit/icon/glyph/person';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import RoadmapIcon from '@atlaskit/icon/glyph/roadmap';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import HomeIcon from '@atlaskit/icon/glyph/home';
import BoardIcon from '@atlaskit/icon/glyph/board';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import SearchIcon from '@atlaskit/icon/glyph/search';
import OfficeBuildingIcon from '@atlaskit/icon/glyph/office-building';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';

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

  return (
    <div className="sidebar">
      <div className='wpBar'>
        <div className='wpBar_button' onClick={push.bind(this, '/manage')}>
          <HomeIcon label='Home icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/timeline`)}>
          <RoadmapIcon label='Roadmap icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/reports`)}>
          <DocumentsIcon label='Reports icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/search`)}>
          <SearchIcon label='Search icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/storage`)}>
          <UploadIcon label='Work drive icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button' onClick={push.bind(this, `/workspace/${workspaceId}/settings`)}>
          <SettingsIcon label='Settings icon' size="medium" primaryColor='#ffffff' />
        </div>
        <div className='wpBar_button bottom' onClick={push.bind(this, `/account`)}>
          <PersonCircleIcon label='Account icon' size="medium" primaryColor='#ffffff' />
        </div>
      </div>
        <SideNavigation className='rBar'>
          <NavigationHeader>
            <Header iconBefore={<OfficeBuildingIcon />} description="Workspace">{workspaceName}</Header>
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
                    <NestingItem iconBefore={<PeopleGroupIcon />} title="Teams">
                      <Section>
                        <ButtonItem>Jack</ButtonItem>
                      </Section>
                    </NestingItem>
                  </Section>
                  <Section title="Other">
                    <ButtonItem iconBefore={<AppSwitcherIcon />}>Explore</ButtonItem>
                  </Section>
              </NestableNavigationContent>
        </SideNavigation>
      </div>
  );
}
export default Sidebar;
