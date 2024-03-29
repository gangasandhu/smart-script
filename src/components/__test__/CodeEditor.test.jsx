import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';

describe("Code Editor - Unit Test", () => {
    it("should render the code editor properly", async () => {
        const renderedEditor = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // check if text for parts of code editor appear
        expect(renderedEditor.getByText('Code Editor')).toBeInTheDocument();
        expect(renderedEditor.getByRole('button', { name: 'Run' })).toBeInTheDocument();
        expect(renderedEditor.getByRole('link', { name: 'AskAI' })).toBeInTheDocument();
    });

    it("should render the compiler properly", async () => {
        const renderedCompiler = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const compiler = await renderedCompiler.findByTestId("compiler");
        expect(compiler).toBeDefined();
    })
});
