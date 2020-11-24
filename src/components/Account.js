import Button from '@atlaskit/button';
import { useStateValue } from '../StateProvider';
import './Account.css';
import db from '../firebase';
import { useHistory } from 'react-router-dom';

function Account() {
    
    const [{ user }] = useStateValue();
    const history = useHistory();

    const setPaidUser = () => {
        db.collection('paidUsers').doc(user.uid).set({
            name: user.displayName,
            email: user.email
        })
        // history.push('/console');
        // window.location.reload();
    }

    return (
        <div className="account">
            <div className="account_info">
                <div className="info_header">
                    <h2>Account information:</h2>
                </div>
                <div className="info_body">
                    <img src={user.photoURL} alt="Avatar" className="avatar"></img>
                    <p>Your ID: {user.uid}</p>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>Plan: Business</p>
                    <Button appearance='danger'>Delete my account</Button>
                </div>
            </div>
            <div className="account_pricing">
                <div className="pricing_header">
                    <h2>Pricing</h2>
                </div>
                <div className="pricing_body">
                    <div>
                        <Button shouldFitContainer isDisabled>Free (current)</Button>
                    </div>
                    <div>
                        <Button shouldFitContainer onClick={setPaidUser} appearance='primary'>Bussiness (5$/Month)</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Account;