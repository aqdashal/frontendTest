import React, { useState } from 'react';
import clearFilterIcon from '../../images/clear-filter.png';
import "./logger.scss";

const INITIAL_FILTERS = {
    empName: "",
    actionType: "",
    applicationType: "",
    applicationId: "",
    fromDate: "",
    toDate: ""
}

const LoggerFiltter = ({ actionTypes, applicationTypes, handleFilter }) => {

    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [isFiltered, setIsFiltered] = useState(false);

    const clearFilters = () => {
        setFilters(INITIAL_FILTERS);
        handleFilter({});
        setIsFiltered(false);
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value
        })
    }


    const handleApplyFilters = () => {
        const {
            empName,
            actionType,
            applicationType,
            applicationId,
            fromDate,
            toDate } = filters;
        if (!actionType && !applicationType && !applicationId && !fromDate && !toDate && !empName) {
            return
        }
        handleFilter({
            ...(actionType && { actionType }),
            ...(applicationType && { applicationType }),
            ...(applicationId && { applicationId }),
            ...(fromDate && { fromDate }),
            ...(toDate && { toDate }),
            ...(empName && { empName })
        })
        setIsFiltered(true);
    }

    return (
        <>
            <div className="d-flex align-items-end">
                <div className="form-group w-100 me-3">
                    <label htmlFor="empName">Employee Name</label>
                    <input  value={filters.empName} onChange={handleChangeInput} type="text" className="form-control" name="empName" placeholder="e.g admin user" />
                </div>

                <div className="form-group w-100 me-3">
                    <label htmlFor="actionType">Action Type</label>
                    <select aria-label="actionType" value={filters.actionType} onChange={handleChangeInput} className="form-control" name="actionType">
                        <option value="">--select--</option>
                        {actionTypes?.map((actionType, index) => (
                            <option key={index} value={actionType}>{actionType}</option>
                        ))}
                    </select>
                </div>


                <div className="form-group w-100 me-3">
                    <label htmlFor="applicationType">Application Type</label>
                    <select value={filters.applicationType} onChange={handleChangeInput} className="form-control" name="applicationType">
                        <option value="">--select--</option>
                        {
                            applicationTypes?.map((applicationType, index) => (
                                <option key={index} value={applicationType}>{applicationType}</option>
                            ))
                        }
                    </select>
                </div>


                <div className="form-group w-100 me-3">
                    <label htmlFor="fromDate">From Date</label>
                    <input value={filters.fromDate} onChange={handleChangeInput} type="date" className="form-control" name="fromDate" />
                </div>


                <div className="form-group w-100 me-3">
                    <label htmlFor="toDate">To Date</label>
                    <input value={filters.toDate} onChange={handleChangeInput} type="date" className="form-control" name="toDate" />
                </div>


                <div className="form-group w-100 me-3">
                    <label htmlFor="applicationId">Application ID</label>
                    <input value={filters.applicationId} placeholder="eg.173894756234504" onChange={handleChangeInput} type="text" className="form-control" name="applicationId" />
                </div>

                <div className="form-group w-100">
                    <label htmlFor="searchBtn"></label>
                    <button onClick={handleApplyFilters} type="button" name="searchBtn" className="btn btn-primary d-block w-100">Search</button>
                </div>
                {
                    isFiltered && (
                        <div className="form-group">
                            <img className="img-responsive filterImg" onClick={clearFilters} src={clearFilterIcon} />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default LoggerFiltter;