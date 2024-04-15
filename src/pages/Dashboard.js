import { Link } from 'react-router-dom';
import '../App.css';

export function Dashboard({handleAddClick}) {
  // Dummy data
  const services = [
    { id: 1, name: 'Service 1'},
    { id: 2, name: 'Service 2'}
  ];

  return (
    <div>
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
          {services.map((service) => (
            <tr key={"/service/" + service.name}>
              <td><Link to={"/service/" + service.name}>{service.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}