import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Main } from './features/main/Main';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
