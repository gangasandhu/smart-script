import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';

describe("Code Editor - Unit Test", () => {
    it("should render the code editor properly", async () => {
        const renderEditor = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // check if text for parts of code editor appear
        expect(renderEditor.getByText('Code Editor')).toBeInTheDocument();
        expect(renderEditor.getByRole('button', { name: 'Run' })).toBeInTheDocument();
        expect(renderEditor.getByRole('link', { name: 'AskAI' })).toBeInTheDocument();
    });

    it("should render the compiler properly", async () => {
        const renderCompiler = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const compiler = await renderCompiler.findByTestId("compiler");
        expect(compiler).toBeDefined();
    })
});

describe("Multiple Language Flexibility - Unit Test", () => {
    it("", async () => {
        const renderLanguage = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const language = await renderLanguage.findByTestId("language");
        expect(language).toBeDefined();
    });
});

describe("Multiple Themes - Unit Test", () => {
    it("should render the theme select drop down properly", async () => {
        const renderThemeSelector = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const themeSelector = await renderThemeSelector.findByTestId("theme");
        expect(themeSelector).toBeDefined();
    });

    /*it("should render light theme when selected", async () => {
        const { getByTestId, getAllByTestId } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        fireEvent.click(getByTestId('theme'), { target: {value: 2} })
        let options = getAllByTestId('theme-options')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });

    it("should render light theme when selected", async () => {
        const handleThemeChange = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const select = handleThemeChange.findByTestId("theme-options");
        const optionSelect = themeOptions[1];

        fireEvent.change(select, { target: { value: optionSelect.value } });
        expect(handleThemeChange).toHaveBeenCalledWith(optionSelect);
    });*/
});