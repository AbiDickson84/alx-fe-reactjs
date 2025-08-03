import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from "./components/Search";

function App() {
  return (
    <div>
      <Search />

      <h1 className="text-red-500 text-3xl font-bold">Tailwind Works!</h1>

    </div>
  );

}


export default App;
