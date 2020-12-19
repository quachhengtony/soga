import { useHistory } from "react-router-dom";
import "./Topbar.css";
import { useStateValue } from "../StateProvider";

function LoggedInTopbar() {
  const history = useHistory();
  const { user } = useStateValue();

  const push = (page) => {
    history.push(page);
  };

  return (
    <div className="topbar">
      <div className="topbar__left">
        <p className="text --companyName">soga</p>
      </div>
      <div className="topbar__right">
        {!!user ? (
          <>
            <p onClick={() => push("/b/inbox")} className="text --nav">
              inbox
            </p>
            <p onClick={() => push("/b/dashboard")} className="text --nav">
              dashboard
            </p>
            <p onClick={() => push("/b/account")} className="text --nav">
              account
            </p>
          </>
        ) : (
          <>
            <p className="text --nav">solutions</p>
            <p className="text --nav">pricing</p>
            <p className="text --nav">support</p>
            <p className="text --nav">contact</p>
            <p onClick={() => push("/sign-in")} className="text --nav">
              sign in
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export { LoggedInTopbar };
