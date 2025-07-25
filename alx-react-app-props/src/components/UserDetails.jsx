import { useState, useContext, createContext } from "react";

function UserDetails({ userData }) {
  const [user, setUser] = useState();
  return (
    <div>
      <p>Name:{userData.name}</p>
      <p>Email: {userData.email} </p>
    </div>
  );
}

export default UserDetails;