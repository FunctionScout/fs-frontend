import { useParams, useLocation, Link } from 'react-router-dom';
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
            
            <DependentServices functionDetail={functionDetail}/>
        </div>
    );
}

function DependentServices({ functionDetail }) {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        }
    ];

    var dependentServices = [];

    if (functionDetail.dependentServices != null) {
        dependentServices = functionDetail.dependentServices.map(dependentService => {
            return getServiceObject(dependentService)
        });
    }

    return (
        <div>
            <h4>These are the services depending on function {`"${functionDetail.name}"`}</h4>

            <DataTable
                columns={columns}
                data={dependentServices}
            />
        </div>
    );
}

function getServiceObject(dependentService) {
    const { repo } = getRepoFromUrl(dependentService.githubUrl);

    return  {
        name: <Link to={`/service/${repo}`} state={{ id: dependentService.id }}>{repo}</Link>
    };
  }

const getRepoFromUrl = (url) => {
    const regex = /^(?:https?:\/\/)?github.com\/(.*)\/(.*)\.git$/;
    const match = url.match(regex);

    if (match) {
      return { repo: match[2] };
    }
    return { repo: "REPO" };
  }