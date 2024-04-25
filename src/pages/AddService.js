import '../App.css';
import { useState } from 'react';

export function AddService({ isOpen, onClose, onAddItem }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ githubUrl: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      onAddItem(inputValue);
    } catch (error) {
      console.error('Error adding service:', error);
    } finally {
      setIsLoading(false);
      onClose();
      
    }
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
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    )
  );
}