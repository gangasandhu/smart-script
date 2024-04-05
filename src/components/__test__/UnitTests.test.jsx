import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home';
import Chat from '../../pages/Chat';
import { MemoryRouter } from 'react-router-dom';

describe("Multiple Language Flexibility - Unit Tests", () => {
    it("should render the language selection dropdown properly", async () => {
        const renderLanguage = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const language = await renderLanguage.findByTestId('language');
        expect(language).toBeDefined();
    });
});

describe("Instant Compilation - Unit Tests", () => {
    it("should render the code editor properly", async () => {
        const renderEditor = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // check if text for parts of code editor appear
        expect(renderEditor.getByText('Code Editor')).toBeInTheDocument();
        expect(renderEditor.getByText('Run')).toBeInTheDocument();
        expect(renderEditor.getByText('AskAI')).toBeInTheDocument();
    });

    it("should render the compiler properly", async () => {
        const renderCompiler = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const compiler = await renderCompiler.findByTestId('compiler');
        expect(compiler).toBeDefined();
    })
});

describe("Multiple Themes - Unit Tests", () => {
    it("should render the theme select drop down properly", async () => {
        const renderThemeSelector = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const themeSelector = await renderThemeSelector.findByTestId('theme');
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

describe("Code Suggestions - Unit Tests", () => {
    it("should render the askai button properly", async () => {
        const renderAskAI = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const askAI = await renderAskAI.findByTestId("askai");
        expect(askAI).toBeDefined();
    });

    it("", async () => {

    });
});

/*describe("Error Suggestions - Unit Test", () => {
    it("", async () => {

    });

    it("", async () => {

    });
});*/

describe("Chatbot Integration - Unit Tests", () => {
    it("should initialize with the correct initial message", async () => {
        const renderChat = render(<Chat />);
        const initialMessage = await renderChat.getByText("Hello, I'm your personal AI Assistant. Feel free to ask me anything!");
        expect(initialMessage).toBeDefined();
    });

    it("should render all messages properly", async () => {
        const renderedMessages = render(<Chat />);
        const message = await renderedMessages.findAllByTestId(/^message/);
        expect(message.length).toEqual(1);
    });

    it("should render the chatbox properly", async () => {
        const renderedChatbox = render(<Chat />);
        const chatBox = await renderedChatbox.findByTestId('input')
        expect(chatBox).toBeDefined();
    });
});