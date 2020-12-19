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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <StateContext.Provider value={{ user }}>
      {props.children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
