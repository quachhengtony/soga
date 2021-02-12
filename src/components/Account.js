// import { useState } from "react";
// import { useStateValue } from "../contexts/StateProvider";
// import "../styles/Account.css";

// function Account() {
//   const { user } = useStateValue();
//   const [togglePricing, setTogglePricing] = useState(false);

//   return (
//     <div className="account">
//       <div className="account__div --userAccount">
//         <div>
//           <p className="account__p --header">User account</p>
//           <p className="account__p">{user ? user.email : "..."}</p>
//           <p className="account__p">
//             Invited to 2 workspaces. Created 9 workspaces.
//           </p>
//         </div>
//         <img src={user?.photoURL} alt="Avatar" className="account__avatar" />
//       </div>
//       <div className="flexify">
//         <div className="account__div --select">
//           <p
//             className="account__p --clickable"
//             onClick={() => setTogglePricing(false)}
//           >
//             General
//           </p>
//           <p
//             className="account__p --clickable"
//             onClick={() => setTogglePricing(true)}
//           >
//             Pricing
//           </p>
//           <p
//             className="account__p --clickable"
//           >
//             Danger
//           </p>
//         </div>
//         <div
//           className="account__div --general"
//           style={{ display: togglePricing ? "none" : "" }}
//         >
//           <p className="account__p --header">Profile</p>
//           <p className="account__p">Id: {user ? user.uid : "..."}</p>
//           <p className="account__p">Name: {user ? user.displayName : "..."}</p>
//           <p className="account__p">Email: {user ? user.email : "..."}</p>
//           <p className="account__p">Joined: 08/02/2019</p>
//         </div>
//         <div
//           className="account__div --pricing"
//           style={{ display: togglePricing ? "" : "none" }}
//         >
//           <p className="account__p --header">Plans</p>
//           <p className="account__p">Current plan: Free</p>
//           <p className="account__p --clickable">Upgrade to Business</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Account;

import React from "react";

export default function Account() {
  return (
    <div className="content">
      <div className="container-xl">
        {/* Page title */}
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">
                Profile & Account [Work in Progress]
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
