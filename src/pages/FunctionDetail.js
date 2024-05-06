import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CodeBlock, github } from 'react-code-blocks';
import DataTable from 'react-data-table-component';

export function FunctionDetail() {
    const { service_name, function_name } = useParams();
    const location = useLocation();
    const functionId = location.state.id;

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
            <h2>Services
                <span style={{fontSize: "20px"}}>{` --> ${service_name}`}
                    <span style={{fontSize: "18px"}}>{` --> ${functionDetail.clazz + "." + function_name}`}</span>
                </span>
            </h2>

            <h3>Function Signature</h3>

            <CodeBlock
                text={functionDetail.signature}
                language={"java"}
                showLineNumbers={true}
                theme={github}
            />
            
            <DependentServices function_name={function_name}/>
        </div>
    );
}

function DependentServices({ function_name }) {
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
            <h4>These are the services depending on function {`"${function_name}"`}</h4>

            <DataTable
                columns={columns}
                data={[]}
            />
        </div>
    );
}