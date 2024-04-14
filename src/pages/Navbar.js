import { Link } from 'react-router-dom';
import '../App.css';

export function Navbar() {
    return (
      <div className="vertical-navbar">
        <ul>
          <li>FunctionScout</li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    );
}