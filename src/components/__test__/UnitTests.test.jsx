import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home';
import Chat from '../../pages/Chat';
import { BrowserRouter } from 'react-router-dom';

const MockHome = () => {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

const MockChat = () => {
    return (
        <BrowserRouter>
            <Chat />
        </BrowserRouter>
    )
}

describe("Multiple Language Flexibility - Unit Tests", () => {
    it("should render the language selection dropdown properly", async () => {
        const renderLanguage = render(
            <MockHome />
        );

        const language = await renderLanguage.findByTestId('language');
        expect(language).toBeDefined();
    });

    it("should be able to be clickable (language tab)", async () => {
        const clickLanguage = render(
            <MockHome />
        );

        fireEvent.click(clickLanguage.getByText(/Select Language:/i));
        const languageTab = await clickLanguage.findByTestId('language-tab');
        expect(languageTab).toBeDefined();
    });
});

describe("Instant Compilation - Unit Tests", () => {
    it("should render the code editor properly", async () => {
        const renderEditor = render(
            <MockHome />
        );

        // check if text for parts of code editor appear
        expect(renderEditor.getByText('Code Editor')).toBeInTheDocument();
        expect(renderEditor.getByText('Run')).toBeInTheDocument();
        expect(renderEditor.getByText('AskAI')).toBeInTheDocument();
    });

    it("should render the compiler properly", async () => {
        const renderCompiler = render(
            <MockHome />
        );

        const compiler = await renderCompiler.findByTestId('compiler');
        expect(compiler).toBeDefined();
    })
});

describe("Multiple Themes - Unit Tests", () => {
    it("should render the theme select drop down properly", async () => {
        const renderThemeSelector = render(
            <MockHome />
        )

        const themeSelector = await renderThemeSelector.findByTestId('theme');
        expect(themeSelector).toBeDefined();
    });

    it("should be able to be clickable (theme tab)", async () => {
        const clickTheme = render(
            <MockHome />
        );

        fireEvent.click(clickTheme.getByText(/Select Theme:/i));
        const themeTab = await clickTheme.findByTestId('theme-tab');
        expect(themeTab).toBeDefined();
    });
});

describe("Code Suggestions - Unit Tests", () => {
    it("should render the askai button properly", async () => {
        const renderAskAI = render(
            <MockHome />
        )

        const askAI = await renderAskAI.findByTestId("askai");
        expect(askAI).toBeDefined();
    });

    it("should render the ai code suggestion properly", async () => {
        const renderCodeSuggestion = render(
            <MockHome />
        )

        fireEvent.click(renderCodeSuggestion.getByText(/AskAI/i));
        const codeSuggestion = await renderCodeSuggestion.findByTestId("code-suggestion");
        expect(codeSuggestion).toBeDefined();
    });
});

describe("Error Suggestions - Unit Test", () => {
    it("should display the status of the compiler after running", async () => {
        const renderStatus = render(
            <MockHome />
        )

        fireEvent.click(renderStatus.getByText(/Run/i));
        const status = await renderStatus.findByTestId("status");
        expect(status).toBeDefined();
    });

    it("should display the output box of the status code", async () => {
        const renderOutput = render(
            <MockHome />
        )

        fireEvent.click(renderOutput.getByText(/Run/i));
        const status = await renderOutput.findByTestId("output");
        expect(status).toBeDefined();
    });
});

describe("Chatbot Integration - Unit Tests", () => {
    it("should initialize chatbot with the correct initial message", async () => {
        const renderChat = render(<MockChat />);
        const initialMessage = renderChat.getByText("Hello, I'm your personal AI Assistant. Feel free to ask me anything!");
        expect(initialMessage).toBeDefined();
    });

    it("should render all chatbot messages properly", async () => {
        const renderedMessages = render(<MockChat />);
        const message = await renderedMessages.findAllByTestId(/^message/);
        expect(message.length).toEqual(1);
    });

    it("should render the chatbox properly", async () => {
        const renderedChatbox = render(<MockChat />);
        const chatBox = await renderedChatbox.findByTestId('input')
        expect(chatBox).toBeDefined();
    });
});