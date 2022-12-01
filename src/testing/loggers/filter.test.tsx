import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoggerFiltter from "../../containers/logger/filters";
import { actionTypes, applicationTypes } from "../data";

describe('<LoggerFilter/>', () => {

    let handleFilter: jest.Mock;
    let actionTypeList: string[];
    let applicationTypeList: string[];

    const setup = () =>
        render(
            <MemoryRouter>
                <LoggerFiltter {...{ actionTypes: actionTypeList, applicationTypes: applicationTypeList, handleFilter }} />
            </MemoryRouter>
        )

    beforeEach(() => {
        actionTypeList = actionTypes;
        applicationTypeList = applicationTypes
        handleFilter = jest.fn();
    })

    it("it should render initially", () => {
        setup();
    })

    it("it renders LoggerFiltter properly", () => {
        setup();

        expect(screen.getByText(/Application Type/i))
        expect(screen.getByText(/Action Type/i))
        expect(screen.getByText(/From Date/i))
        expect(screen.getByText(/To Date/i))
        expect(screen.getByText(/Application ID/i))
        expect(screen.getByText(/Employee Name/i))
    })

    it("handleFilter should not be called when search button clicked if no filter selected", async () => {
        setup();
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: /search/i }));
        expect(handleFilter).toBeCalledTimes(0);
    });

    test("snapshot", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <LoggerFiltter {...{ actionTypes: actionTypeList, applicationTypes: applicationTypeList, handleFilter }} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
