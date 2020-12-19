import { useState, useEffect, useCallback } from 'react';
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
  const { user } = useStateValue();
  const history = useHistory();

  const [workspaceName, setWorkspaceName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);

  const push = (destination) => {
    history.push(destination);
  }

  const memoizedSetRooms = useCallback(() => {
    db.collection('workspaces').doc(workspaceId).collection('rooms').orderBy("timestamp", "asc").onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        roomId: doc.id,
        roomName: doc.data().roomName
      })))
    ))
  }, [rooms])

  const memoizedSetWorkspaceUsers = useCallback(() => {
    db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").onSnapshot(snapshot => (
      setWorkspaceUsers(snapshot.docs.map(doc => doc.data()))
    ))
  }, [workspaceUsers])

  useEffect(() => {
    db.collection('workspaces').doc(workspaceId).get().then(function(doc) {
      setWorkspaceName(doc.data().workspaceName)
    })
    memoizedSetRooms();
    // db.collection('workspaces').doc(workspaceId).collection('rooms').orderBy("timestamp", "asc").onSnapshot(snapshot => (
    //   setRooms(snapshot.docs.map(doc => ({
    //     roomId: doc.id,
    //     roomName: doc.data().roomName
    //   })))
    // ))
    memoizedSetWorkspaceUsers();
    // db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").onSnapshot(snapshot => (
    //   setWorkspaceUsers(snapshot.docs.map(doc => doc.data()))
    // ))
  }, [])

  return (
    <div className="sidebar">
      <div className='wpBar'>
        <div className='wpBar_button' onClick={push.bind(this, '/b/dashboard')}>
          <HomeIcon size="medium" primaryColor='#ffffff' />
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
        <div className='wpBar_button bottom' onClick={push.bind(this, `/b/account`)}>
          <PersonCircleIcon label='Account icon' size="medium" primaryColor='#ffffff' />
        </div>
      </div>
        <SideNavigation className='rBar'>
          <NavigationHeader>
            <Header iconBefore={<OfficeBuildingIcon />} description="Workspace">{workspaceName ? workspaceName : "..."}</Header>
          </NavigationHeader>
          <NestableNavigationContent>
                <Section>
                  <Section title='Rooms'>
                    {rooms.map((room, index) => (
                      <SelectRoom text={room.roomName} id={room.roomId} key={index} />
                    ))}
                    <CreateRoom />
                    <ButtonItem onClick={push.bind(this, `board`)} iconBefore={<BoardIcon/>}>Board</ButtonItem>
                    <ButtonItem onClick={push.bind(this, `schedule`)} iconBefore={<CalendarIcon />}>Schedule</ButtonItem>
                  </Section>
                  <Section title='People'>
                    <ButtonItem iconBefore={<CustomerIcon />}>{user?.displayName}</ButtonItem>
                    {workspaceUsers.map(({ userEmail }) => (
                      <>
                        {userEmail != user?.email && <ButtonItem iconBefore={<PeopleGroupIcon />}>{userEmail}</ButtonItem>}
                      </>
                    ))}
                  </Section>
                  <Section title="Other">
                    <ButtonItem iconBefore={<AppSwitcherIcon />}>Explore</ButtonItem>
                  </Section>
                  </Section>
              </NestableNavigationContent>
        </SideNavigation>
      </div>
  );
}
export default Sidebar;
