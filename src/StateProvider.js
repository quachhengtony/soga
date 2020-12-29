// import React, { createContext, useContext, useReducer } from 'react';

// export const StateContext = createContext();

// export const StateProvider = ({ reducer, initialState, children }) => (
//     <StateContext.Provider value={useReducer(reducer, initialState)}>
//         {children}
//     </StateContext.Provider>
// );

// export const useStateValue = () => useContext(StateContext);

import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebase";

export const StateContext = createContext();

export function StateProvider(props) {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  const [currentDate, setCurrentDate] = useState("");

  const getCurrentDate = () => {
    var today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setCurrentDate(today);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setPending(false);
    });
    getCurrentDate();
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <StateContext.Provider value={{ user, currentDate }}>
      {props.children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
