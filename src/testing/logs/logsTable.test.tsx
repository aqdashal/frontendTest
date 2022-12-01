import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { MOCK_LOGS, columns } from "../data"
import { MemoryRouter } from 'react-router-dom';
import LogsTable from "../../components/table";

describe('<LogsTable>', () => {

    let handleSorting: jest.Mock;
    let tableData, sortField, sortOrder;
    let tableColumns;

    const setup = () => {
        render(
            <MemoryRouter>
                <LogsTable {...{ data: tableData, columns: tableColumns, sortField, sortOrder, handleSorting }} />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        tableData = MOCK_LOGS;
        sortField = "";
        sortOrder = "";
        tableColumns = columns;
        handleSorting = jest.fn();
    })

    it("should render initially", () => {
        setup();
    })

    it("it renders LogsTable properly", () => {
        setup();
        expect(screen.getByRole("table"))
    })
})