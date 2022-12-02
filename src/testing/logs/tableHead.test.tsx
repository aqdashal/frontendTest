import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { columns } from "../data"
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import TableHead from "../../components/table/TableHead";

describe('<TableHead/>', () => {

    let handleSorting: jest.Mock;
    let sortOrder;
    let sortField;
    let tableColumns;

    const setup = () =>
        render(
            <MemoryRouter>
                <TableHead {...{ columns: tableColumns, sortField, sortOrder, handleSorting }} />
            </MemoryRouter>
        )

    beforeEach(() => {
        sortOrder = "";
        sortField = "";
        tableColumns = columns;
        handleSorting = jest.fn();
    })

    it("it should render initially", () => {
        setup();
    })

    it("it renders TableHead properly", () => {
        setup();

        expect(screen.getByText(/Log ID/i))
        expect(screen.getByText(/Application Type/i))
        expect(screen.getByText(/Application ID/i))
        expect(screen.getByText(/Action Details/i))
        expect(screen.getByText(/Date:Time/i))
    })

    test("snapshot", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <TableHead {...{ columns: tableColumns, sortField, sortOrder, handleSorting }} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
