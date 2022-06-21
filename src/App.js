import React from 'react'

// React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Css
import './App.css';

// Components
import Home from './components/home/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>       
      </Router>
    </>
  );
}

export default App;
