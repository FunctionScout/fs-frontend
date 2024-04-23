import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ServiceDetail } from './pages/ServiceDetail';
import { AddService } from './pages/AddService';
import { FunctionDetail } from './pages/FunctionDetail';
import { Status } from './pages/Status';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddItem = (newService) => {
     console.log('New service added:', newService);
  };

  return (
    <div className="container">
      <Router>
        <Navbar />
          <div className="content">
            <Routes>
              <Route path='/' element={<Dashboard handleAddClick={handleAddClick}/> } />
              <Route path='/dashboard' element={<Dashboard handleAddClick={handleAddClick}/>} />
              <Route path='/status' element={<Status />} />
              <Route path="/service/:service_name" element={<ServiceDetail />} />
              <Route path="/service/:service_name/function/:function_name" element={<FunctionDetail />} />
            </Routes>
          </div>
      </Router>

      <AddService 
          isOpen={showModal} 
          onClose={handleModalClose} 
          onAddItem={handleAddItem} 
        />
    </div>
  );
}

export default App;