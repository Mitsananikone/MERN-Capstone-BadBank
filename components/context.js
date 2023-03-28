import React, { useState, createContext } from 'react';

const UserContext = createContext({ user: null, setUser: () => {} });

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
