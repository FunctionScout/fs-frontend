import '../App.css';
import { useState } from 'react';

export function AddService({ isOpen, onClose, onAddItem }) {
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleAddItem = () => {
      onAddItem(inputValue);
      onClose();
    };
  
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Add Service</h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Github URL"
            />
            <button onClick={handleAddItem}>Add</button>
          </div>
        </div>
      )
    );
}