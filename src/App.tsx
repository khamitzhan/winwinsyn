import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Deposit from './pages/Deposit';
import Profile from './pages/Profile';
import PrizeDraw from './pages/PrizeDraw';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="profile" element={<Profile />} />
          <Route path="prizedraw" element={<PrizeDraw />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
