const TableBody = ({ tableData, columns }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr key={data.logId}>
                        {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "——";
                            return <td className="border-bottom" key={accessor}>{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;