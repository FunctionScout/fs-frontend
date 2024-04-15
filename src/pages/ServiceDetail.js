import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { CodeBlock, github } from 'react-code-blocks';
import { serviceDetails } from './MockData';

export function ServiceDetail() {
    const { service_name } = useParams();

    const options = [
      { value: 'dependencies', label: 'Dependencies'},
      { value: 'functions', label: 'Functions'},
      { value: 'unusedCode', label: 'Unused Code'}
    ]

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const renderComponent = () => {
      if(selectedOption.value === 'dependencies') {
        return <Dependencies service_name={service_name} />
      } else if(selectedOption.value === 'functions') {
        return <Functions service_name={service_name} />
      } else if(selectedOption.value === 'unusedCode') {
        return <UnusedCode service_name={service_name} />
      }
    }
  
    return (
      <div>
        <h2>{service_name}</h2>
        
        <div style={{width: '180px'}}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        
        {console.log('Selected option is: ' + JSON.stringify(selectedOption))}

        {renderComponent()}
      </div>
    );
}

function Dependencies({ service_name }) {
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
  
  return (
    <div>
      <h3>These are the dependencies of {`"${service_name}"`}<span style={{fontSize: "13px"}}>(Expand the dependencies to see the used functions)</span></h3>
      <DataTable
        columns={columns}
        data={serviceDetails[service_name].dependencies}
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
      name: 'GithubLink',
      selector: row => row.githubLink,
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data.functions}
    />
  );
}

function Functions({ service_name }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'GithubLink',
      selector: row => row.githubLink,
    }
  ];

  return (
    <div>
      <h3>These are the exposed functions of {`"${service_name}"`}</h3>
      <DataTable
        columns={columns}
        data={serviceDetails[service_name].usedFunctions}
      />
    </div>
  );
}

function UnusedCode({ service_name }) {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'GithubLink',
      selector: row => row.githubLink,
    }
  ];

  return (
    <div>
      <h3>These are the unused functions in {`"${service_name}"`}</h3>

      <DataTable
        columns={columns}
        data={serviceDetails[service_name].unusedFunctions}
        expandableRows
        expandableRowsComponent={ExpandedUnusedFunction}
      />
    </div>
  );
}

function ExpandedUnusedFunction({ data }) {
  const language = "java";
  const showLineNumbers = true;
  const code = `private void ${data.label}(int value, List<Object> objects) { 
    for (Object obj: objects)  {
      if (obj.val == value) {
        System.out.println("Found it!");
      }
    }
}`

  return (
    <CodeBlock
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={github}
    />
  );
}