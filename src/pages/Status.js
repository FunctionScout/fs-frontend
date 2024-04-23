import DataTable from 'react-data-table-component';

export function Status() {
    const columns = [
        {
            name: 'GithubUrl',
            selector: row => row.githubUrl,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Created At',
            selector: row => row.createdDT,
        }
    ];

    const data = [
        {
            githubUrl: 'https://github.com/test/repo',
            status: 'IN_PROGRESS',
            createdDT: "04-22-2024T00:00:00"
        },
        {
            githubUrl: 'https://github.com/test1/repo1',
            status: 'SUCCESS',
            createdDT: "04-22-2024T00:00:00"
        },
        {
            githubUrl: 'https://github.com/test2/repo2',
            status: 'FAILED',
            createdDT: "04-22-2024T00:00:00"
        }
    ]

    return (
        <div>
            <h4>You can find the status of all Services here</h4>

            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    );
}