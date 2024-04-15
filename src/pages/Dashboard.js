import { Link } from 'react-router-dom';
import { services } from './MockData';
import '../App.css';

export function Dashboard({handleAddClick}) {
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
            <tr key={"/service/" + service}>
              <td><Link to={"/service/" + service}>{service}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}