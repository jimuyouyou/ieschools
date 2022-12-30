import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Main } from './features/main/Main';
import { TabularReport } from './features/tabular/TabularReport';
import { BarChart } from './components/BarChart';
import { PieChart } from './components/PieChart';
import { IndividualReport } from './features/individual/IndividualReport';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/tabular" element={<TabularReport />} />
        <Route path="/barchart" element={<BarChart />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/individual" element={<IndividualReport />} />
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
