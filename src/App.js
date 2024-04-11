import './App.css';
import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getDemoResponse();
  }

  componentDidUpdate(prevProps) {
    if (this.props.val !== prevProps.val) {
      this.getDemoResponse();
    }
  }

  getDemoResponse() {
    const url = "http://localhost:8080/demo";

    axios.get(url)
    .then(response => this.setState(
      {
        response: response
      }
    ))
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.response ? (
          <>Data from backend: {this.state.response.data}</>
        ) : (
          <>No data from backend, yet</>
        )}
      </div>
    );
  }
}

export default App;