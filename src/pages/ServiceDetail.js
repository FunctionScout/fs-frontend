import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { CodeBlock, github } from 'react-code-blocks';

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
        return <Dependencies />
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

function Dependencies() {
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
  
  const data = [
    {
      id: 1,
      name: 'Servcie 10',
      type: 'Internal',
      functions: [
        {
          name: (
            <Link to={"/service/Service 10/function/f1"}>Function 1</Link>
          ),
          githubLink: <a href="https://github.com/service10/f1">https://github.com/service10/f1</a>
        },
        {
          name: (
            <Link to={"/service/Service 10/function/f10"}>Function 10</Link>
          ),
          githubLink: <a href="https://github.com/service10/f10">https://github.com/service10/f10</a>
        }
      ]
    },
    {
      id: 2,
      name: 'Servcie 7',
      type: 'Internal',
      functions: [
        {
          name: (
            <Link to={"/service/Service 7/function/f5"}>Function 5</Link>
          ),
          githubLink: <a href="https://github.com/service7/f5">https://github.com/service7/f5</a>
        },
        {
          name: (
            <Link to={"/service/Service 7/function/f8"}>Function 8</Link>
          ),
          githubLink: <a href="https://github.com/service7/f8">https://github.com/service7/f8</a>
        }
      ]
    },
    {
      id: 3,
      name: 'Servcie 12',
      type: 'External',
      functions: [
        {
          name: (
            <Link to={"/service/Service 12/function/f3"}>Function 3</Link>
          ),
          githubLink: <a href="https://github.com/service12/f3">https://github.com/service12/f3</a>
        },
        {
          name: (
            <Link to={"/service/Service 12/function/f14"}>Function 14</Link>
          ),
          githubLink: <a href="https://github.com/service12/f14">https://github.com/service12/f14</a>
        }
      ]
    }
  ]
  
  return (
    <DataTable
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedDependency}
    />
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

  const data = [
    {
      name: (
        <Link to={"/service/" + service_name + "/function/f1"}>Function 1</Link>
      ),
      githubLink: <a href="https://github.com/servicex/f1">https://github.com/servicex/f1</a>
    },
    {
      name: (
        <Link to={"/service/" + service_name + "/function/f10"}>Function 10</Link>
      ),
      githubLink: <a href="https://github.com/servicex/f10">https://github.com/servicex/f10</a>
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
    />
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

  const data = [
    {
      name: (
        <Link to={"/service/" + service_name + "/function/f5"}>Function 5</Link>
      ),
      githubLink: <a href="https://github.com/servicex/f5">https://github.com/servicex/f5</a>,
      label: "f5"
    },
    {
      name: (
        <Link to={"/service/" + service_name + "/function/f6"}>Function 6</Link>
      ),
      githubLink: <a href="https://github.com/servicex/f6">https://github.com/servicex/f6</a>,
      label: "f6"
    }
  ];

  return (
  <DataTable
    columns={columns}
    data={data}
    expandableRows
    expandableRowsComponent={ExpandedFunction}
  />
  );
}

function ExpandedFunction({ data }) {
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