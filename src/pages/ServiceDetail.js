import { useParams } from 'react-router-dom';
import './ServiceDetail.css';

export function ServiceDetail() {
    const { service_name } = useParams();
  
    return (
      <div>
        <h2>{service_name}</h2>

        <form className="container">
          <select
              className="item"
              name="Service Options"
              style={{ width: "200px" }}
          >
              <option value="Dependencies" selected>Dependencies</option>
              <option value="Functions">Functions</option>
              <option value="UnusedCode">Unused Code</option>
          </select>
          </form>
      </div>
    );
}