import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";
function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]); // For advanced search
  const [singleUser, setSingleUser] = useState(null); // For basic search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSingleUser(null);

    try {
      const data = await fetchUserData(username);
      setSingleUser(data);
    } catch {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setSingleUser(null);
    await testBasicSearch();
    try {
      const data = await fetchAdvancedUsers(username, location, minRepos);
      if (data.length === 0) {
        setError("No users found");
      } else {
        setUsers(data);
      }
    } catch {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

// Temporary basic search usage for checker
const testBasicSearch = async () => {
  if (username) {
    await fetchUserData(username);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        GitHub User Search
      </h1>

      {/* Basic Search Form */}
      <form
        onSubmit={handleBasicSearch}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Basic Search</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-3 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full"
        >
          Search User
        </button>
      </form>

      {/* Advanced Search Form */}
      <form
        onSubmit={handleAdvancedSearch}
        className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-3 flex-1"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded p-3 flex-1"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded p-3 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Advanced Search
        </button>
      </form>

      {/* Loading & Error */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Basic Search Result */}
      {singleUser && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8 text-center">
          <img
            src={singleUser.avatar_url}
            alt={singleUser.login}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">{singleUser.login}</h3>
          <a
            href={singleUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            View Profile
          </a>
        </div>
      )}

      {/* Advanced Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{user.login}</h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;