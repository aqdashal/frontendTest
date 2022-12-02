import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { MOCK_LOGS, columns } from "../data"
import { MemoryRouter } from 'react-router-dom';
import TableBody from "../../components/table/TableBody";

describe('<TableBody>', () => {
    let tableData;
    let tableColumns;
    let testData = MOCK_LOGS[0];

    const setup = () => {
        render(
            <MemoryRouter>
                <TableBody {...{ tableData, columns }} />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        tableData = MOCK_LOGS;
        tableColumns = columns;
    })

    it("should render initially", () => {
        setup();
    })
})