import React, { useState, useEffect, createContext } from "react";

import AppHelper from "./app-helper";

//Context object
export const UserContext = createContext();

//Allows consuming components to subscribe to context changes
export const UserProvider = (props) => {
  const [user, setUser] = useState({
    id: null,
    
  });

  // Function for clearing local storage upon logout
  const unsetUser = () => {
    localStorage.clear();
    // Set the user global scope in the context provider to have its email set to null
    setUser({
      id: null,
    });
  };

  const fetchUser = () => {
    const options = {
      headers: { Authorization: `Bearer ${AppHelper.getAccessToken()}` },
    };

    fetch(`${AppHelper.API_URL}/users/details`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({ id: data._id, token: AppHelper.getAccessToken(), ...data });
        } else {
          setUser({ id: null });
        }
      });
  };

  useEffect(() => {
    fetchUser();
  }, [user.id]);

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser, fetchUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
