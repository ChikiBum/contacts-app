import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contacts } from "../pages/Contacts/Contacts";

describe('contacts get data', () => {
    test('loading', async () => {
        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();

        await waitForElementToBeRemoved(loader);
    });

    test('success', async () => {
        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        await waitForElementToBeRemoved(loader);
        
        expect(loader).not.toBeInTheDocument();
        expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
        
    });
});

describe('contacts data view mode', () => {
    test('should equal table', async () => {
        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();

        await waitForElementToBeRemoved(loader);

        expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-table')).toHaveClass(
            "Mui-selected"
        );

        expect(screen.queryByTestId('contacts-grid-container')).not.toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-grid')).not.toHaveClass(
            "Mui-selected"
        );
    });

    test('switch grid to table', async () => {
        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();

        await waitForElementToBeRemoved(loader);

        userEvent.click(screen.getByTestId('toogle-dataviewmode-grid'));
        userEvent.click(screen.getByTestId('toogle-dataviewmode-table'));

        expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-table')).toHaveClass(
            "Mui-selected"
        );

        expect(screen.queryByTestId('contacts-grid-container')).not.toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-grid')).not.toHaveClass(
            "Mui-selected"
        );
    });

    test('should equal grid', async () => {
        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();

        await waitForElementToBeRemoved(loader);

        userEvent.click(screen.getByTestId('toogle-dataviewmode-grid'));

        expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-grid')).toHaveClass(
            "Mui-selected"
        );

        expect(screen.queryByTestId('contacts-table-container')).not.toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-table')).not.toHaveClass(
            "Mui-selected"
        );

        expect(window.localStorage.getItem('dataViewMode')).toEqual('grid')
    });


    test('should equal grid with reload page', async () => {
        window.localStorage.setItem('dataViewMode', 'grid');

        render(<Contacts />);
        
        const loader = screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();

        await waitForElementToBeRemoved(loader);

        expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-grid')).toHaveClass(
            "Mui-selected"
        );

        expect(screen.queryByTestId('contacts-table-container')).not.toBeInTheDocument();
        expect(screen.getByTestId('toogle-dataviewmode-table')).not.toHaveClass(
            "Mui-selected"
        );

        window.localStorage.clear();
    });
})

