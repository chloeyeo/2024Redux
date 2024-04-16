import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from "redux"; // 1.
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// storage defaults to localstorage for web applications.
import storage from "redux-persist/lib/storage"; // identify which storage to use
import { persistStore, persistReducer } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));

/* Redux:
1. Create a store
2. Make a reducer (to put it in create store param)
3. Create a provider to surround app in. Pass in store into provider
*/

const initialState = {
  num: 900,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "decrement":
      return {
        ...state,
        num: state.num - action.payload,
      };
    default:
      return state;
  }
};

// persistConfig defines the configuration for persistence
const persistConfig = {
  key: "root", // the key under which the persisted state will be stored
  // key can be named anything other than root also
  storage, // default to localstorage
};

// persistReducer takes a regular Redux reducer and returns a new
// reducer with state persistence capabilities (i.e. state gets stored in localstorage
// and does not disappear when user reloads the page or shuts down page)
const myPersistReducer = persistReducer(persistConfig, reducer);

const store = createStore(myPersistReducer);

// persistStore actually stores data in localstorage (so must add this line).
// persistStore function from redux-persist takes your Redux store and
// returns a persisted version of it.
// it creates a Redux store that automatically reads from and writes to
// the specified storage mechanism (localStorage) based on the provided configuration
// (persistConfig). It enhances the Redux store created by createStore with
// persistence capabilities, allowing your application's state to persist "across sessions".
const persistor = persistStore(store);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
