import React, { useEffect, useState, useMemo } from 'react';
import { fetchLoggers } from "../../actions/loggerActions";
import { handleSortData, handleFilterData } from "../../utils";
import LoggerTable from "../../components/table";
import LoggerFiltters from "../logger/filters";
import Pagination from "../../components/pagination";
import './logger.scss';

const Logger = () => {

    const [loggersData, setLoggers] = useState([]);
    const [apiError, setApiError] = useState({});
    const [actionTypes, setActionTypes] = useState([]);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [count, setCount] = useState(0);

    const [params, setParams] = useState({
        pageNumber: 1,
        pageSize: 10,
        filters: {},
        sortOrder: '',
        sortField: ''
    });

    const columns = [
        { label: "Log ID", accessor: "logId", sortable: true },
        { label: "Application Type", accessor: "applicationType", sortable: true },
        { label: "Application ID", accessor: "applicationId", sortable: true },
        { label: "Action", accessor: "actionType", sortable: true },
        { label: "Action Details", accessor: "" },
        { label: "Date:Time", accessor: "creationTimestamp", sortable: true },
    ];

    useEffect(() => {
        fetchLoggers().then(({ result }) => {
            setLoggers(result?.auditLog || []);
            if (result?.auditLog?.length) {
                const actionTypes = [...new Set(result?.auditLog?.map(log => log.actionType).filter(val => val) || [])];
                const applicationTypes = [...new Set(result?.auditLog?.map(log => log.applicationType).filter(val => val) || [])];
                setApplicationTypes(applicationTypes);
                setActionTypes(actionTypes);
            }
        }).catch(error => {
            setApiError({
                error: true,
                message: error.message
            });
        })
    }, []);

    const handleChangePage = (page) => {
        setParams({
            ...params,
            pageNumber: page
        })
    };


    const handleFilter = (filters) => {
        setParams({
            ...params,
            pageNumber: 1,
            filters: { ...filters }
        })
    }

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            setParams({
                ...params,
                sortField,
                sortOrder,
                pageNumber: 1
            })
        }
    };

    const { pageNumber, pageSize, filters, sortField, sortOrder } = params;


    const filteredData = useMemo(() => {
        const filtered = handleFilterData(filters, loggersData);
        setCount(filtered?.length || 0);
        setParams({
            ...params,
            pageNumber: 1
        })
        return filtered;
    }, [JSON.stringify(filters), loggersData])


    const paginatedData = useMemo(() => {
        const firstPageIndex = (pageNumber - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return [...filteredData].slice(firstPageIndex, lastPageIndex);
    }, [pageNumber, filteredData]);

    const currentTableData = useMemo(() => {
        const sorted = handleSortData(sortField, sortOrder, paginatedData);
        return sorted;
    }, [sortField, sortOrder, paginatedData]);


    return (
        <div className="container mt-4">
            <LoggerFiltters
                actionTypes={actionTypes}
                applicationTypes={applicationTypes}
                handleFilter={handleFilter}
            />
            <div className="shadow">
            <LoggerTable
                columns={columns}
                data={currentTableData}
                sortField={sortField}
                sortOrder={sortOrder}
                handleSorting={handleSorting}
            />
            <Pagination
                className="pagination-bar"
                currentPage={params.pageNumber}
                totalCount={count}
                pageSize={params.pageSize}
                onPageChange={handleChangePage}
            />
            </div>
        </div>
    )
}

export default Logger;