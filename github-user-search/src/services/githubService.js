import axios from "axios";

// Task 1: Basic search
export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data; // single user object
};

// Task 2: Advanced search
export const fetchAdvancedUsers = async (username, location, minRepos) => {
  let query = "";
  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}`
  );
  return response.data.items; // returns array of users
};