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
                <p className="text --nav">support</p>
                <p className="text --nav">contact</p>
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
                <p onClick={() => push("/inbox")} className="text --nav">inbox</p>
                <p onClick={() => push("/manage")} className="text --nav">dashboard</p>
                <p onClick={() => push("/account")} className="text --nav">account</p>
            </div>
        </div>
    );
}

export { PublicTopbar, LoggedInTopbar, BusinessTopbar };
