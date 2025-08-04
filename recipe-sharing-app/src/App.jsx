import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Sharing App</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/add">Add Recipe</Link> | 
        <Link to="/favorites">My Favorites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<>
          <SearchBar />
          <RecipeList />
          <RecommendationsList />
        </>} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </div>
  );
}

export default App;