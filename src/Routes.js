import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModeSelectionModal from './components/Modes/index';
import Game from './components/Game';

const AppRoutes = ({ darkHandler }) => (
  <Router>
    <Routes>
      <Route path="/" element={<ModeSelectionModal />} />
      <Route path="/game" element={<Game darkness={darkHandler} />} />
    </Routes>
  </Router>
);

export default AppRoutes;
