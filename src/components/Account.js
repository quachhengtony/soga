import Button from "@atlaskit/button";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import "./Account.css";
import db from "../firebase";

function Account() {
  const [{ user }] = useStateValue();
  const [togglePricing, setTogglePricing] = useState(false);

  const setPaidUser = () => {
    if (user) {
      db.collection("paidUsers")
        .doc(user.uid)
        .set({
          userName: user.displayName,
          userEmail: user.email,
          userId: user.id,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    } else return;
  };

  return (
    <div className="account">
      <div className="account__div --userAccount">
        <div>
          <p className="account__p --header">User account</p>
          <p className="account__p">{user ? user.email : "..."}</p>
          <p className="account__p">
            Invited to 2 workspaces. Created 9 workspaces.
          </p>
        </div>
        <img src={user.photoURL} alt="Avatar" className="account__avatar" />
      </div>
      <div className="flexify">
        <div className="account__div --select">
          <p
            className="account__p --clickable"
            onClick={() => setTogglePricing(false)}
          >
            General
          </p>
          <p
            className="account__p --clickable"
            onClick={() => setTogglePricing(true)}
          >
            Pricing
          </p>
          <p
            className="account__p --clickable"
          >
            Danger
          </p>
        </div>
        <div
          className="account__div --general"
          style={{ display: togglePricing ? "none" : "" }}
        >
          <p className="account__p --header">Profile</p>
          <p className="account__p">Id: {user ? user.uid : "..."}</p>
          <p className="account__p">Name: {user ? user.displayName : "..."}</p>
          <p className="account__p">Email: {user ? user.email : "..."}</p>
          <p className="account__p">Joined: 08/02/2019</p>
        </div>
        <div
          className="account__div --pricing"
          style={{ display: togglePricing ? "" : "none" }}
        >
          <p className="account__p --header">Plans</p>
          <p className="account__p">Current plan: Free</p>
          <p className="account__p --clickable">Upgrade to Business</p>
        </div>
      </div>
    </div>
  );
}
export default Account;
