import { AtlassianNavigation, PrimaryButton } from '@atlaskit/atlassian-navigation';
import { useHistory } from 'react-router-dom';

import './Topbar.css';
import { useStateValue } from '../StateProvider';

function Topbar() {

    const [{user}] = useStateValue();
    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    const Home = () => (
        <PrimaryButton onClick={push.bind(this, '/home')}>SOGA</PrimaryButton>
    );

    const Account = () => (
        <PrimaryButton onClick={push.bind(this, '/account')}>Account</PrimaryButton>
    );

    return (
        <div className="navbar">
            <AtlassianNavigation
                renderProductHome={Home}
                primaryItems={[
                    <PrimaryButton>Why Soga?</PrimaryButton>,
                    <PrimaryButton>Solutions</PrimaryButton>,
                    <PrimaryButton>Support</PrimaryButton>,
                    <PrimaryButton>Company</PrimaryButton>,
                    <PrimaryButton>Find a Remote Job</PrimaryButton>,
                    <PrimaryButton>Profile</PrimaryButton>,
                    <PrimaryButton>Manage</PrimaryButton>,
                ]}
                renderSignIn={Account}
                />
        </div>
    );
}

function TopbarForPaidUser() {
    const history = useHistory();

    const push = (page) => {
        history.push(page);
    }

    const Home = () => (
        <PrimaryButton onClick={push.bind(this, '/home')}>Soga</PrimaryButton>
    );

    const Account = () => (
        <PrimaryButton onClick={push.bind(this, '/account')}>Account</PrimaryButton>
    );

    return (
        <div className="navbar">
             <AtlassianNavigation
                renderProductHome={Home}
                primaryItems={[
                    <PrimaryButton>Why Soga?</PrimaryButton>,
                    <PrimaryButton>Solutions</PrimaryButton>,
                    <PrimaryButton>Support</PrimaryButton>,
                    <PrimaryButton>Company</PrimaryButton>,
                    <PrimaryButton>Find a Remote Job</PrimaryButton>,
                    <PrimaryButton>Hiring</PrimaryButton>,
                    <PrimaryButton onClick={push.bind(this, '/console')}>Manage</PrimaryButton>,
                ]}
                renderSignIn={Account}
                />
        </div>
    );
}

export { Topbar, TopbarForPaidUser };
