import React from "react";
import { useContext, createContext, useState } from "react";
import UserContext from "./UserContext";

const UserProfile = () => {
  const [userData, setDataUser] = UserContext();
  return (
    <div>
      <p>Name:{userData.name}</p>
      <p>Email: {userData.email} </p>
    </div>
  );
};

export default UserProfile;