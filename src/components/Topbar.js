// import { AtlassianNavigation, PrimaryButton } from '@atlaskit/atlassian-navigation';
// import NotificationIcon from '@atlaskit/icon/glyph/notification';
// import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
// import { useHistory } from 'react-router-dom';

// import './Topbar.css';
// import { useStateValue } from '../StateProvider';

// function PublicTopbar() {

//     const history = useHistory();

//     const push = (page) => {
//         history.push(page);
//     }

//     const Home = () => (
//         <PrimaryButton className="topbar__primaryButton" onClick={push.bind(this, '/home')}>SOGA</PrimaryButton>
//     );

//     const SignIn = () => (
//         <PrimaryButton onClick={push.bind(this, '/sign-in')}>Sign In</PrimaryButton>
//     );

//     return (
//         <div className="topbar">
//             <AtlassianNavigation
//                 renderProductHome={Home}
//                 primaryItems={[
//                     <PrimaryButton>Why Soga?</PrimaryButton>,
//                     <PrimaryButton>Solutions</PrimaryButton>,
//                     <PrimaryButton>Support</PrimaryButton>,
//                     <PrimaryButton>Company</PrimaryButton>,
//                     // <PrimaryButton onClick={push.bind(this, "/find-a-remote-job")}>Find a Remote Job</PrimaryButton>
//                 ]}
//                 renderSignIn={SignIn}
//                 />
//         </div>
//     );
// }

// function LoggedInTopbar() {

//     const [{ user }] = useStateValue();
//     const history = useHistory();

//     const push = (page) => {
//         history.push(page);
//     }

//     const Home = () => (
//         <PrimaryButton className="topbar__primaryButton" onClick={push.bind(this, '/home')}>SOGA</PrimaryButton>
//     );

//     // const JobList = () => (
//     //     <PrimaryButton onClick={push.bind(this, '/find-a-remote-job')}>Find a Remote Job</PrimaryButton>
//     // )

//     const Notification = () => (
//         <a className="topbar__roundedButton">
//             <NotificationIcon label="" />
//         </a>
//     )

//     const Help = () => (
//         <a className="topbar__roundedButton">
//             <QuestionCircleIcon label="" />
//         </a>
//     )

//     const Account = () => (
//         <PrimaryButton onClick={push.bind(this, '/account')}>Account</PrimaryButton>
//     );

//     return (
//         <div className="topbar">
//             <AtlassianNavigation
//                 renderProductHome={Home}
//                 primaryItems={[
//                     <PrimaryButton>Why Soga?</PrimaryButton>,
//                     <PrimaryButton>Solutions</PrimaryButton>,
//                     <PrimaryButton>Company</PrimaryButton>,
//                     // <PrimaryButton onClick={push.bind(this, "/talents")}>Talents</PrimaryButton>,
//                     <PrimaryButton onClick={push.bind(this, "/inbox")}>Inbox</PrimaryButton>
//                 ]}
//                 // renderCreate={JobList}
//                 renderNotifications={Notification}
//                 renderHelp={Help}
//                 renderProfile={Account}
//                 />
//         </div>
//     );
// }

// function BusinessTopbar() {
//     const history = useHistory();
//     const [{ user }] = useStateValue();

//     const push = (page) => {
//         history.push(page);
//     }

//     const Home = () => (
//         <PrimaryButton className="topbar__primaryButton" onClick={push.bind(this, '/home')}>SOGA</PrimaryButton>
//     );

//     const Notification = () => (
//         <a className="topbar_roundedButton">
//             <NotificationIcon label="" />
//         </a>
//     )

//     const Help = () => (
//         <a className="topbar_roundedButton">
//             <QuestionCircleIcon label="" />
//         </a>
//     )

//     const Account = () => (
//         <PrimaryButton onClick={push.bind(this, '/account')}>{user?.displayName}</PrimaryButton>
//     );

//     // const JobPost = () => (
//     //     <PrimaryButton onClick={push.bind(this, '/post-a-remote-job')}>Post a Remote Job</PrimaryButton>
//     // )

//     return (
//         <div className="topbar">
//              <AtlassianNavigation
//                 renderProductHome={Home}
//                 primaryItems={[
//                     <PrimaryButton>Why Soga?</PrimaryButton>,
//                     <PrimaryButton>Solutions</PrimaryButton>,
//                     <PrimaryButton>Company</PrimaryButton>,
//                     // <PrimaryButton onClick={push.bind(this, '/talents')}>Talents</PrimaryButton>,
//                     <PrimaryButton onClick={push.bind(this, '/manage')}>Manage</PrimaryButton>
//                 ]}
//                 // renderCreate={JobPost}
//                 renderNotifications={Notification}
//                 renderHelp={Help}
//                 renderProfile={Account}
//                 />
//         </div>
//     );
// }

// export { PublicTopbar, LoggedInTopbar, BusinessTopbar };

import { useHistory } from 'react-router-dom';

import './Topbar.css';
import { useStateValue } from '../StateProvider';

function PublicTopbar() {

    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    return (
        <div className="topbar">
            <div className="topbar__left">
                <p className="text --companyName">soga</p>
            </div>
            <div className="topbar__right">
                <p className="text --nav">solutions</p>
                <p className="text --nav">pricing</p>
                <p className="text">support</p>
                <p className="text">contact</p>
                <p onClick={() => push("/sign-in")} className="text --nav">sign in</p>
            </div>
        </div>
    );
}

function LoggedInTopbar() {

    const [{ user }] = useStateValue();
    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    return (
        <div className="topbar">
        <div className="topbar__left">
            <p className="text --companyName">soga</p>
        </div>
        <div className="topbar__right">
            <p onClick={() => push("/inbox")} className="text --nav">inbox</p>
            <p onClick={() => push("/account")} className="text --nav">account</p>
        </div>
    </div>
    );
}

function BusinessTopbar() {
    const history = useHistory();
    const [{ user }] = useStateValue();

    const push = (page) => {
        history.push(page);
    }

    return (
        <div className="topbar">
            <div className="topbar__left">
                <p className="text --companyName">soga</p>
            </div>
            <div className="topbar__right">
                <p className="text --nav">inbox</p>
                <p onClick={() => push("/manage")} className="text --nav">dashboard</p>
                <p onClick={() => push("/account")} className="text --nav">account</p>
            </div>
        </div>
    );
}

export { PublicTopbar, LoggedInTopbar, BusinessTopbar };
