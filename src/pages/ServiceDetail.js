import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { CodeBlock, github } from 'react-code-blocks';

export function ServiceDetail() {
    const { service_name } = useParams();
    const location = useLocation();
    const serviceId = location.state.id;

    const options = [
      { value: 'dependencies', label: 'Dependencies'},
      { value: 'functions', label: 'Functions'},
      { value: 'unusedCode', label: 'Unused Code'}
    ]

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const renderComponent = () => {
      if(selectedOption.value === 'dependencies') {
        return <Dependencies service_id={serviceId} />
      } else if(selectedOption.value === 'functions') {
        return <Functions service_id={serviceId} service_name={service_name}/>
      } else if(selectedOption.value === 'unusedCode') {
        return <UnusedCode service_id={serviceId} service_name={service_name}/>
      }
    }
  
    return (
      <div>
          <h2>Services
            <span style={{fontSize: "20px"}}>{` --> ${service_name}`}</span>
          </h2>
        
        <div style={{width: '180px'}}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        
        {/* {console.log('Selected option is: ' + JSON.stringify(selectedOption))} */}

        {renderComponent()}
      </div>
    );
}

function Dependencies({ service_id }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Type',
      selector: row => row.type,
    }
  ];

  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/${service_id}/dependencies`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setDependencies(data.dependencies);
      } catch (error) {
        console.error("Error fetching webservice dependencies: ", error);
      }
    };

    fetchData();
  }, [service_id]);
  
  return (
    <div>
      <h3>These are the dependencies of the selected service <span style={{fontSize: "13px"}}>(Expand the dependencies to see the used functions)</span></h3>
      <DataTable
        columns={columns}
        data={dependencies}
        expandableRows
        expandableRowsComponent={ExpandedDependency}
      />
    </div>
  );
}

function ExpandedDependency({ data }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Class',
      selector: row => row.clazz,
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data.usedFunctions}
    />
  );
}

function getFunctionObject(service_name, funcObj) {
  const functionRoute = `/service/${service_name}/function/${funcObj.name}`;

  return  {
      name: <Link to={functionRoute} state={{ id: funcObj.id }}>{funcObj.name}</Link>,
      clazz: funcObj.clazz,
  };
}

function Functions({ service_id, service_name }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Class',
      selector: row => row.clazz,
    }
  ];

  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/${service_id}/functions`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setFunctions(data.functions.map(funcObj => {
          return getFunctionObject(service_name, funcObj);
        }));
      } catch (error) {
        console.error("Error fetching webservice functions: ", error);
      }
    };

    fetchData();
  }, [service_id, service_name]);

  return (
    <div>
      <h3>These are the exposed functions of {`"${service_name}"`}</h3>
      <DataTable
        columns={columns}
        data={functions}
      />
    </div>
  );
}

function UnusedCode({ service_id, service_name }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Class',
      selector: row => row.clazz,
    }
  ];

  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/${service_id}/unused-code`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setFunctions(data.functions);
      } catch (error) {
        console.error("Error fetching webservice unused code: ", error);
      }
    };

    fetchData();
  }, [service_id]);

  return (
    <div>
      <h3>These are the unused functions in {`"${service_name}"`}</h3>

      <DataTable
        columns={columns}
        data={functions}
        expandableRows
        expandableRowsComponent={ExpandedUnusedFunction}
      />
    </div>
  );
}

function ExpandedUnusedFunction({ data }) {
  const functionId = data.id;
  const [functionDetail, setFunctionDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/functions/${functionId}`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setFunctionDetail(data);
      } catch (error) {
        console.error("Error fetching function detail: ", error);
      }
    };

    fetchData();
  }, [functionId]);

  return (
      <div>
          <CodeBlock
              text={functionDetail.signature}
              language={"java"}
              showLineNumbers={true}
              theme={github}
          />
      </div>
  );
}