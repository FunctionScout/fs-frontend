import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ServiceDetail } from './pages/ServiceDetail';
import { FunctionDetail } from './pages/FunctionDetail';

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
          <div className="content">
            <Routes>
              <Route path='/' element={<Dashboard /> } />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path="/service/:service_name" element={<ServiceDetail />} />
              <Route path="/service/:service_name/function/:function_name" element={<FunctionDetail />} />
            </Routes>
          </div>
      </Router>
    </div>
  );
}

export default App;