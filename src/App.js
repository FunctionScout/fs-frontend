import './App.css';
import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setInputValue(''); // Reset input field when modal closes
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    // Handle adding item here, you can perform any necessary action with inputValue
    // For now, just close the modal
    handleModalClose();
  };

  return (
    <div className="container">
      <div className="vertical-navbar">
        <ul>
          <li>FunctionScout</li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </div>
      <div className="content">
        <div className="header">
          <h2>Services</h2>
          <button className="btn" onClick={handleAddClick}>Add Service</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href='/service'>Service 1</a></td>
            </tr>
            <tr>
              <td><a href='/service'>Service 2</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Add Service</h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter github URL"
            />
            <button onClick={handleAddItem}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;