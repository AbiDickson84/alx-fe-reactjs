import axios from "axios";

export const fetchAdvancedUsers = async (username, location, minRepos) => {
  let query = "";
  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
  return response.data.items; // returns an array of users
};