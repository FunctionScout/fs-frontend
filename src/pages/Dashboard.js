import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddService } from './AddService';

export function Dashboard() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/services');

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    fetchData();
  }

  const getOwnerAndRepoFromUrl = (url) => {
    const regex = /^(?:https?:\/\/)?github.com\/(.*)\/(.*)\.git$/;
    const match = url.match(regex);

    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return { owner: "OWNER", repo: "REPO" };
  }

  const serviceData = services.map((service) => {
    const { owner, repo } = getOwnerAndRepoFromUrl(service.githubUrl);
    return { service, owner, repo };
  });

  return (
    <div>
      <div className="header">
        <h2>Services</h2>
        <button className="btn" onClick={handleAddClick}>Add Service</button>

        <AddService 
          isOpen={showModal} 
          onClose={handleModalClose} 
          onAddItem={refreshData} 
        />
      </div>

      {isLoading ? (
        <p>Loading services...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serviceData.map((service) => (
              <tr key={service.service.githubUrl}>
                <td><Link to={"/service/"}>{service.repo}</Link></td>
                <td>{service.service.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
