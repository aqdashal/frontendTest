import React from 'react';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "./table.scss"
const Table = ({ data, columns, handleSorting, sortField, sortOrder }) => {
    return (
        <div className="mt-4">
            <table className="w-100">
                <TableHead {...{ columns, handleSorting, sortField, sortOrder }} />
                <TableBody {...{ columns, tableData: data }} />
            </table>
        </div>
    );
};

export default Table;