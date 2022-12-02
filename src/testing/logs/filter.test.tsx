import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LogsFiltter from "../../containers/logs/filters";
import { actionTypes, applicationTypes } from "../data";

describe('<LoggerFilter/>', () => {

    let handleFilter: jest.Mock;
    let actionTypeList: string[];
    let applicationTypeList: string[];

    const setup = () =>
        render(
            <MemoryRouter>
                <LogsFiltter {...{ actionTypes: actionTypeList, applicationTypes: applicationTypeList, handleFilter }} />
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

    it("handleFilter should be called when search button clicked if filter selected", async () => {
        setup();
        const user = userEvent.setup();
        const actionTypeSelect = screen.getByRole("combobox", { name: /actionType/i });
        user.selectOptions(actionTypeSelect, actionTypeList[1]);
        await user.click(screen.getByRole("button", { name: /search/i }));
        expect(handleFilter).toBeCalledTimes(1);
    });

    test("snapshot", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <LogsFiltter {...{ actionTypes: actionTypeList, applicationTypes: applicationTypeList, handleFilter }} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
