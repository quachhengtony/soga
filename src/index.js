import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { StateProvider } from "./contexts/StateProvider";
import { CurrentUserDetailsProvider } from "./contexts/CurrentUserDetailsContext";
// import reducer, { initialState } from './reducer';
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/js/tabler.min.js";
import "@tabler/core/dist/css/demo.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <StateProvider initialState={initialState} reducer={reducer}> */}
    <StateProvider>
      <CurrentUserDetailsProvider>
      <App />
      </CurrentUserDetailsProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
