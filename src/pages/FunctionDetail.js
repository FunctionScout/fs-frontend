import { useParams } from 'react-router-dom';
import { CodeBlock, github } from 'react-code-blocks';
import DataTable from 'react-data-table-component';
import { usedFunctionDetails } from './MockData';

export function FunctionDetail() {
    const { service_name, function_name } = useParams();
    const language = "java";
    const showLineNumbers = true;
    const code = `private void ${function_name}(int value, List<Object> objects) { 
        ... 
}`

    return (
        <div>
            <h2>Services
                <span style={{fontSize: "20px"}}>{` --> ${service_name}`}
                    <span style={{fontSize: "18px"}}>{` --> ${function_name}`}</span>
                </span>
            </h2>

            <CodeBlock
                text={code}
                language={language}
                showLineNumbers={showLineNumbers}
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
                data={usedFunctionDetails[function_name].dependents}
            />
        </div>
    );
}