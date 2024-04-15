import { useParams } from 'react-router-dom';
import { CodeBlock, github } from 'react-code-blocks';
import DataTable from 'react-data-table-component';

export function FunctionDetail() {
    const { service_name, function_name } = useParams();
    const language = "java";
    const showLineNumbers = true;
    const code = `private void ${function_name}(int value, List<Object> objects) { 
        ... 
}`

    return (
        <div>
            <h2>Service: {service_name }, Function: {function_name}</h2>

            <CodeBlock
                text={code}
                language={language}
                showLineNumbers={showLineNumbers}
                theme={github}
            />

            <DependentServices />
        </div>
    );
}

function DependentServices() {
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
            name: "Service 5",
            githubLink: (<a href="https://github.com/service5"> https://github.com/service5</a>)
        },
        {
            name: "Service 12",
            githubLink: (<a href="https://github.com/service12"> https://github.com/service12</a>)
        },
        {
            name: "Service 3",
            githubLink: (<a href="https://github.com/service3"> https://github.com/service3</a>)
        },
        {
            name: "Service 9",
            githubLink: (<a href="https://github.com/service9"> https://github.com/service9</a>)
        }
    ]

    return (
    <DataTable
        columns={columns}
        data={data}
    />
    );
}